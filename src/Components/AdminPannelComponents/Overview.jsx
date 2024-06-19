import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Overview = () => {
  const eventSelector = useSelector((state) => state.eventId.value);
  const [eventData, setEventData] = useState(null);
  const [eventParticipants, setEventParticipants] = useState([]);

  const totalSales = (price, totalParticipants) => {
    const totalRevenue = price * totalParticipants;

    const percentageDeduction = totalRevenue * 0.02;
    const fixedDeduction = totalParticipants * 5;

    const finalTotal = totalRevenue - (percentageDeduction + fixedDeduction);

    return finalTotal.toLocaleString();
  };

  const getTodayParticipants = (participants) => {
    const today = new Date();
    return participants.filter((participant) => {
      const registrationDate = new Date(participant.userRegistrationDate);
      return (
        registrationDate.getDate() === today.getDate() &&
        registrationDate.getMonth() === today.getMonth() &&
        registrationDate.getFullYear() === today.getFullYear()
      );
    });
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axios.get(
          `https://tesract-server.onrender.com/event/${eventSelector.eventId}`
        );
        setEventData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchEventApi = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/participants/event/${eventSelector.eventId}`
        );
        setEventParticipants(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
    fetchEventApi();
  }, []);
  return (
    <>
      <div className="flex flex-col space-y-6 p-6 rounded-lg shadow-md max-h max-w">
        {/* First Row */}
        <div className="flex space-x-6">
          {/* Box 1: Number of Participants */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-md flex-1">
            <h2 className="text-lg font-semibold text-gray-100 mb-2">
              Number of Participants
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-extrabold text-blue-500">
                {
                  eventParticipants.filter(
                    (participant) =>
                      participant.paymentData?.data?.state === "COMPLETED"
                  ).length
                }
              </span>
              <div className="flex flex-col text-sm text-gray-300">
                <span className="leading-tight">Total</span>
                <span className="leading-tight">Participants(Paid)</span>
              </div>
            </div>
          </div>
          {/* Box 2: Total Sales */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-md flex-1">
            <h2 className="text-lg font-semibold text-gray-100 mb-2">
              total sales
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-extrabold text-green-500">
                ₹{totalSales(eventData?.eventPrice, eventParticipants.length)}
              </span>
              <div className="flex flex-col text-sm text-gray-300">
                <span className="leading-tight">Total</span>
                <span className="leading-tight">Revenue</span>
              </div>
            </div>
          </div>
          {/* Box 3: Participants Registered Today */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-md flex-1">
            <h2 className="text-base font-semibold text-gray-100 mb-2">
              Participants Registered Today
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-extrabold text-purple-500">
                {getTodayParticipants(eventParticipants).length}
              </span>
              <div className="flex flex-col text-sm text-gray-300">
                <span className="leading-tight">New</span>
                <span className="leading-tight">Registrations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="flex space-x-6">
          {/* Box 4: Graph */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-md flex-1">
            <h2 className="text-lg font-semibold text-gray-100">
              Graph Placeholder
            </h2>
            {/* Insert your graph component here */}
          </div>
          {/* Box 5: Event Details */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-md flex-2">
            <h2 className="text-lg font-semibold text-gray-100">
              Welcome Back Event
            </h2>
            <p className="text-gray-100">
              Last Date for Registrations: June 30, 2024
            </p>
            <p className="text-gray-100">Event Price: $100</p>
          </div>
        </div>

        {/* Third Row */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-100">
            Recent Participants
          </h2>
          <div className="overflow-x-auto mt-4">
            <table className="table-auto w-full text-gray-100">
              <thead>
                <tr className="bg-gray-600">
                  <th className="px-4 py-2 border border-gray-500">Name</th>
                  <th className="px-4 py-2 border border-gray-500">Email</th>
                  <th className="px-4 py-2 border border-gray-500">
                    Payment Status
                  </th>
                  <th className="px-4 py-2 border border-gray-500">
                    Transcation ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {eventParticipants
                  .slice(eventParticipants.length - 5, eventParticipants.length)
                  .map((participant, index) => (
                    <tr key={index} className="hover:bg-gray-600">
                      <td className="border px-4 py-2 border-gray-500">
                        {participant.name}
                      </td>
                      <td className="border px-4 py-2 border-gray-500">
                        {participant.email}
                      </td>
                      <td className="border px-4 py-2 border-gray-500">
                        {participant.paymentData?.data?.state
                          ? "Paid"
                          : "Failed"}
                      </td>
                      <td className="border px-4 py-2 border-gray-500">
                        {participant.paymentData?.data?.transactionId
                          ? participant.paymentData?.data?.transactionId
                          : "NULL"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
