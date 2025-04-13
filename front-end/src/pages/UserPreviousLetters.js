import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export default function UserPreviousLetters() {
  // is signed in as user?
  const { user } = useAuth();
  const [coverLetters, setCoverLetters] = useState("");

  useEffect(() => {
    const fetchCoverLetters = async () => {
      if (!user || !user._id) return; // 👈 wait until user is ready

      try {
        const res = await axios.get(
          `http://localhost:5000/api/coverLetters/user/${user._id}`,
          { withCredentials: true }
        );
        setCoverLetters(res.data); // assuming res.data is an array
        console.log(res.data);
        console.log(coverLetters);
      } catch (err) {
        console.error("Error fetching cover letters:", err);
      }
    };

    fetchCoverLetters();
  }, [user]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Cover Letters</h2>
      {user && user._id ? (
        <>
          {coverLetters.length > 0 ? (
            coverLetters.map((letter, index) => (
              <div key={index} className="mb-6 p-4 border rounded shadow">
                <h3 className="font-semibold text-lg mb-2">
                  {letter.jobTitle} @ {letter.company}
                </h3>
                <p style={{ whiteSpace: "pre-wrap" }}>{letter.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Saved on {new Date(letter.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p>No cover letters found.</p>
          )}
        </>
      ) : null}
    </div>
  );
}
