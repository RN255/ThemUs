import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { Container, Nav } from "react-bootstrap";

export default function UserPreviousLetters() {
  // is signed in as user?
  const { user } = useAuth();
  const [coverLetters, setCoverLetters] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate indexes
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = coverLetters.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(coverLetters.length / itemsPerPage);

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
    <Container>
      <Nav variant="underline" defaultActiveKey="/previousLetters">
        <Nav.Item>
          <Nav.Link href="/coverLetterGenerator">Create</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/previousLetters">Letter History</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Your Cover Letters</h2>
        {user && user._id ? (
          <>
            {currentItems.length > 0 ? (
              currentItems.map((letter, index) => (
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

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === i + 1 ? "bg-gray-200 font-bold" : ""
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : null}
      </div>
    </Container>
  );
}
