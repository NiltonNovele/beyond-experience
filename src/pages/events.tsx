import React, { useState } from 'react'
import Head from 'next/head'
import { BsCalendar2Event, BsFillPersonFill } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'

interface Event {
  title: string
  image: string
  description: string
  date: string
  time: string
  attendees?: string[]
}

const eventsData: Event[] = [
  {
    title: "Beyond On Stanley Launch",
    image: "/event2.jpg",
    description: "Beyond On Stanley Launch",
    date: "Sunday, 2 November",
    time: "7pm",
    attendees: [],
  },
  {
    title: "Grit & Grace Weekend Experience",
    image: "/ticket.jpeg",
    description: "Grit & Grace Weekend Experience",
    date: "Friday, 7 Novembe @ 7pm | Saturday, 8 November @ 10am",
    time: "",
    attendees: [],
  }
]

const ADMIN_PIN = "0101" // Change this to your desired 4-digit PIN

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>(eventsData)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [newAttendee, setNewAttendee] = useState<string>("")
  const [isAdminView, setIsAdminView] = useState(false)

  const handleOpenModal = (event: Event) => {
    setSelectedEvent(event)
    setNewAttendee("")
  }

  const handleCloseModal = () => {
    setSelectedEvent(null)
    setIsAdminView(false) // reset admin mode when closing
  }

  const handleAddAttendee = () => {
    if (!newAttendee.trim() || !selectedEvent) return

    const updatedEvents = events.map(ev => {
      if (ev.title === selectedEvent.title) {
        return { ...ev, attendees: [...(ev.attendees || []), newAttendee.trim()] }
      }
      return ev
    })

    setEvents(updatedEvents)
    setSelectedEvent({ ...selectedEvent, attendees: [...(selectedEvent.attendees || []), newAttendee.trim()] })
    setNewAttendee("")
  }

  const handleToggleAdmin = () => {
    if (!isAdminView) {
      const pin = prompt("Enter 4-digit admin PIN:")
      if (pin === ADMIN_PIN) {
        setIsAdminView(true)
      } else {
        alert("Incorrect PIN ❌")
      }
    } else {
      setIsAdminView(false)
    }
  }

  return (
    <>
      <main className="min-h-screen bg-gray-50 flex justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 relative">
            <h1 className="text-6xl font-bold text-center w-full" style={{ fontFamily: "MyFont2" }}>Events</h1>
          </div>

          {/* Description */}
          <p className="text-center text-sm text-gray-600 mb-8">
            Explore our upcoming events and join the community. RSVP and bring friends!
          </p>

          {/* Events List */}
          <div className="space-y-6">
            {events.map((event, idx) => (
              <div
                key={idx}
                onClick={() => handleOpenModal(event)}
                className="cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                  <p className="text-gray-700">{event.description}</p>
                  <div className="flex items-center text-gray-500 mt-3 text-sm">
                    <BsCalendar2Event className="mr-2" />
                    {event.date} | {event.time}
                  </div>
                  <div className="flex items-center mt-2 text-gray-400 text-sm">
                    <BsFillPersonFill className="mr-1" /> {event.attendees?.length || 0} attending
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-xl">
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                <AiOutlineClose size={24} />
              </button>

              <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-80 object-cover rounded-lg mb-4" />
              <h2 className="text-2xl font-bold mb-2">{selectedEvent.title}</h2>
              <p className="text-gray-700 mb-4">{selectedEvent.description}</p>
              <div className="flex items-center text-gray-500 mb-4 text-sm">
                <BsCalendar2Event className="mr-2" /> {selectedEvent.date} | {selectedEvent.time}
              </div>

              {/* Attendee Form */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">RSVP</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter attendee name"
                    value={newAttendee}
                    onChange={(e) => setNewAttendee(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddAttendee()}
                  />
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    onClick={handleAddAttendee}
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Attendee List (PIN-protected) */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2 flex items-center justify-between">
                  <span>Attendees</span>
                  <button
                    onClick={handleToggleAdmin}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-sm transition ${
                      isAdminView
                        ? "bg-gray-200 text-gray-800"
                        : "text-gray-400 hover:text-gray-700"
                    }`}
                  >
                    <BsFillPersonFill /> <span>Admin View</span>
                  </button>
                </h3>

                {isAdminView ? (
                  <ul className="max-h-40 overflow-y-auto space-y-1">
                    {selectedEvent.attendees?.length ? (
                      selectedEvent.attendees.map((att, i) => (
                        <li
                          key={i}
                          className="bg-gray-100 px-3 py-1 rounded-lg flex justify-between items-center"
                        >
                          {att}
                          <BsFillPersonFill className="text-gray-400 ml-2" />
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-400 text-sm">No attendees yet</li>
                    )}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-sm italic">Admin view disabled</p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  )
}

export default EventsPage
