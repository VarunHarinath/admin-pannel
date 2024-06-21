import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ParticipantsModel from "./utils/ParticipantsModel";

const Participants = () => {
  const eventSelector = useSelector((state) => state.eventId.value);
  const [participants, setParticipants] = useState([]);
  const [modelParticipant, setModelParticipant] = useState(null);
  const [modal, setModal] = useState(false);

  const openModal = (participant) => {
    setModelParticipant(participant);
    setModal(true);
  };

  const closeModal = () => {
    setModelParticipant(null);
    setModal(false);
  };

  useEffect(() => {
    const fetchParticipantsApi = async () => {
      try {
        const response = await axios.get(
          `https://tesract-server.onrender.com/participants/event/${eventSelector.eventId}`
        );
        setParticipants(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchParticipantsApi();
  }, []);
  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-100 text-xl font-bold sm:text-2xl">
              All products
            </h3>
            <p className="text-gray-100 mt-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <div className="mt-3 md:mt-0">
            <a
              href="javascript:void(0)"
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
              Add product
            </a>
          </div>
        </div>
        <div className="mt-12 relative h-max overflow-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="text-gray-100 font-medium border-b">
              <tr>
                <th className="py-3 pr-6">name</th>
                <th className="py-3 pr-6">date</th>
                <th className="py-3 pr-6">status</th>
                <th className="py-3 pr-6">Transcation ID</th>
                <th className="py-3 pr-6">email</th>
                <th className="py-3 pr-6"></th>
              </tr>
            </thead>
            <tbody className="text-gray-100 divide-y">
              {participants.map((item, idx) => (
                <tr key={idx}>
                  <td className="pr-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    {new Date(item.userRegistrationDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-2 rounded-full font-semibold text-xs ${
                        item?.paymentData?.data?.state == "COMPLETED"
                          ? "text-green-600 "
                          : " text-yellow-600"
                      }`}
                    >
                      {item?.paymentData?.data?.state == "COMPLETED"
                        ? "Completed"
                        : "Pending"}
                    </span>
                  </td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    {item?.paymentData?.data?.transactionId.slice(-5)}
                  </td>
                  <td className="pr-6 py-4 whitespace-nowrap">{item?.email}</td>
                  <td className="text-right whitespace-nowrap">
                    <button
                      href="javascript:void()"
                      className="py-1.5 px-2 text-gray-100 bg-indigo-600 hover:bg-indigo-800 duration-150 text-xs rounded-lg"
                      onClick={() => openModal(item)}
                    >
                      Show More
                    </button>

                    <ParticipantsModel
                      isOpen={modal}
                      closeModal={closeModal}
                      value={modelParticipant}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Participants;
