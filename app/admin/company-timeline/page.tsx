"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Plus, Trash2, GripVertical } from "lucide-react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { useToast } from "@/hooks/use-toast"

interface TimelineEvent {
  year: string
  title: string
  description: string
  color: string
  order: number
}

interface TimelineData {
  title: string
  subtitle: string
  events: TimelineEvent[]
}

export default function CompanyTimelinePage() {
  const [timelineData, setTimelineData] = useState<TimelineData>({
    title: "",
    subtitle: "",
    events: [],
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [error, setError] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/company-timeline")

        if (!response.ok) {
          throw new Error("Failed to fetch company timeline information")
        }

        const data = await response.json()
        // Sort events by order
        const sortedEvents = [...data.events].sort((a, b) => a.order - b.order)
        setTimelineData({
          ...data,
          events: sortedEvents,
        })
      } catch (err) {
        console.error("Error fetching company timeline information:", err)
        setError("Failed to load company timeline information. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchTimelineData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTimelineData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEventChange = (index: number, field: keyof TimelineEvent, value: string) => {
    setTimelineData((prev) => {
      const updatedEvents = [...prev.events]
      updatedEvents[index] = {
        ...updatedEvents[index],
        [field]: value,
      }
      return { ...prev, events: updatedEvents }
    })
  }

  const handleAddEvent = () => {
    setTimelineData((prev) => {
      const newEvent: TimelineEvent = {
        year: "",
        title: "",
        description: "",
        color: "#2c5e3f",
        order: prev.events.length,
      }
      return { ...prev, events: [...prev.events, newEvent] }
    })
  }

  const handleRemoveEvent = (index: number) => {
    setTimelineData((prev) => {
      const updatedEvents = prev.events
        .filter((_, i) => i !== index)
        .map((event, i) => ({
          ...event,
          order: i,
        }))
      return { ...prev, events: updatedEvents }
    })
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(timelineData.events)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update order values
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index,
    }))

    setTimelineData((prev) => ({ ...prev, events: updatedItems }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      setSaving(true)

      const response = await fetch("/api/company-timeline", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(timelineData),
      })

      if (!response.ok) {
        throw new Error("Failed to update company timeline information")
      }

      setSuccessMessage("Company timeline information updated successfully!")

      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (err) {
      console.error("Error updating company timeline information:", err)
      setError("Failed to update company timeline information. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <header className="bg-custom-white border-b border-custom-cream p-4 hidden md:flex items-center justify-between">
        <h1 className="text-2xl font-bold font-rubik text-custom-green">Company Timeline</h1>
      </header>

      <main className="p-6">
        {successMessage && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-800 p-4 rounded-md">{successMessage}</div>
        )}

        {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-800 p-4 rounded-md">{error}</div>}

        <Card className="border-custom-cream bg-custom-cream">
          <CardHeader className="bg-custom-cream/20">
            <CardTitle className="font-rubik text-custom-green">Company Timeline</CardTitle>
            <CardDescription className="font-roboto">Manage your company's timeline information.</CardDescription>
          </CardHeader>

          {loading ? (
            <CardContent className="pt-6 flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-custom-green" />
            </CardContent>
          ) : (
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="font-roboto">
                      Timeline Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={timelineData.title}
                      onChange={handleChange}
                      className="font-roboto border-custom-cream"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subtitle" className="font-roboto">
                      Timeline Subtitle
                    </Label>
                    <Input
                      id="subtitle"
                      name="subtitle"
                      value={timelineData.subtitle}
                      onChange={handleChange}
                      className="font-roboto border-custom-cream"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium font-rubik text-custom-green">Timeline Events</h3>
                    <Button
                      type="button"
                      onClick={handleAddEvent}
                      className="bg-custom-green hover:bg-custom-green/90 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Event
                    </Button>
                  </div>

                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="timeline-events">
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
                          {timelineData.events.map((event, index) => (
                            <Draggable key={`event-${index}`} draggableId={`event-${index}`} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className="border border-custom-cream rounded-lg p-4"
                                >
                                  <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                      <div {...provided.dragHandleProps} className="mr-2 cursor-grab">
                                        <GripVertical className="h-5 w-5 text-gray-400" />
                                      </div>
                                      <h4 className="font-medium font-rubik text-black">Event {index + 1}</h4>
                                    </div>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleRemoveEvent(index)}
                                      className="text-red-500 border-red-300 hover:bg-red-50"
                                    >
                                      <Trash2 className="h-4 w-4 mr-1" /> Remove
                                    </Button>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="space-y-2">
                                      <Label htmlFor={`event-${index}-year`} className="font-roboto">
                                        Year
                                      </Label>
                                      <Input
                                        id={`event-${index}-year`}
                                        value={event.year}
                                        onChange={(e) => handleEventChange(index, "year", e.target.value)}
                                        className="font-roboto border-custom-cream"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor={`event-${index}-title`} className="font-roboto">
                                        Title
                                      </Label>
                                      <Input
                                        id={`event-${index}-title`}
                                        value={event.title}
                                        onChange={(e) => handleEventChange(index, "title", e.target.value)}
                                        className="font-roboto border-custom-cream"
                                      />
                                    </div>
                                  </div>

                                  <div className="space-y-2 mb-4">
                                    <Label htmlFor={`event-${index}-description`} className="font-roboto">
                                      Description
                                    </Label>
                                    <Textarea
                                      id={`event-${index}-description`}
                                      value={event.description}
                                      onChange={(e) => handleEventChange(index, "description", e.target.value)}
                                      rows={3}
                                      className="font-roboto border-custom-cream"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor={`event-${index}-color`} className="font-roboto">
                                      Color
                                    </Label>
                                    <div className="flex items-center space-x-2">
                                      <Input
                                        id={`event-${index}-color`}
                                        type="color"
                                        value={event.color}
                                        onChange={(e) => handleEventChange(index, "color", e.target.value)}
                                        className="w-16 h-10 p-1 border-custom-cream"
                                      />
                                      <Input
                                        value={event.color}
                                        onChange={(e) => handleEventChange(index, "color", e.target.value)}
                                        className="font-roboto border-custom-cream"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button
                    type="submit"
                    className="bg-custom-green hover:bg-custom-green/90 text-white font-roboto"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          )}
        </Card>
      </main>
    </>
  )
}
