import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { Container, Nav } from "react-bootstrap";
import { BsBlockquoteLeft } from "react-icons/bs";

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
          `https://themus.onrender.com/api/coverLetters/user/${user._id}`,
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
          <Nav.Link href="/coverLetterCreator" className="standardBlueColour">
            Create
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/previousLetters">Letter History</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="p-4 page-fade-in">
        <h2 className="text-xl font-bold mb-4">Your Cover Letters</h2>
        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex gap-2 my-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                  currentPage === i + 1 ? "bg-dark text-light" : "bg-light"
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

        {user && user._id ? (
          <>
            {currentItems.length > 0 ? (
              currentItems.map((letter, index) => (
                <div key={index} className="mb-5 p-4 border rounded shadow">
                  <h3 className="font-semibold text-lg mb-2">
                    <BsBlockquoteLeft size="1.75em" className="text-muted" />
                  </h3>
                  <p className="text-sm fst-italic mt-2 text-success">
                    Saved on: {new Date(letter.createdAt).toLocaleDateString()}
                  </p>
                  <p style={{ whiteSpace: "pre-wrap" }}>{letter.content}</p>
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
                      currentPage === i + 1 ? "bg-dark text-light" : "bg-light"
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
