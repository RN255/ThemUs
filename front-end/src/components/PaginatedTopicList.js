import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Pagination from "react-bootstrap/Pagination";

export default function PaginatedJobList(props) {
  // get the job postings from the database
  const [data, setData] = useState([]);
  useEffect(() => {
    // set list page if one exists
    const storedPage = sessionStorage.getItem("currentPage");
    setCurrentPage(storedPage ? parseInt(storedPage, 10) : 1);

    axios
      .get("https://themus.onrender.com/api/entries/entries")
      .then((response) => {
        // Filter only approved posts
        const sortedData = response.data

          // remove unapproved topics.
          .filter((post) => post.approved)

          .sort((a, b) => {
            // Sort in descending order by comparing the timestamps.
            return new Date(b.dateCreated) - new Date(a.dateCreated);
          });

        setData(sortedData);
        setDataLoaded(true);

        const homePageElement = document.querySelector(".minListHeight");
        homePageElement.style.minHeight = `0px`;

        // console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  //function to truncate text
  const truncateDescription = (text) => {
    if (text.length > 150) {
      return text.slice(0, 150) + "...";
    } else {
      return text;
    }
  };

  //pagination stuff
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [displayData, setDisplayData] = useState([]);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayData(data.slice(startIndex, endIndex));
  }, [data, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    sessionStorage.setItem("currentPage", newPage);
  };

  // spinner logic
  const [dataLoaded, setDataLoaded] = useState(false);

  // bootstrap pagination
  let active = currentPage;
  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => {
          handlePageChange(number);
          window.scrollTo({
            top: props.topOfList.current
              ? props.topOfList.current.offsetTop - 56
              : 0,
            behavior: "instant",
          });
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className="row minListHeight">
      {dataLoaded ? (
        <div className="col fadeIn">
          <div>
            <Pagination size="sm" className="m-0">
              <Pagination.Prev
                onClick={() => {
                  handlePageChange(currentPage - 1);
                  window.scrollTo({
                    top: props.topOfList.current
                      ? props.topOfList.current.offsetTop - 56
                      : 0,
                    behavior: "instant",
                  });
                }}
                disabled={currentPage === 1}
              />
              <Pagination size="sm">{items}</Pagination>
              <Pagination.Next
                onClick={() => {
                  handlePageChange(currentPage + 1);
                  window.scrollTo({
                    top: props.topOfList.current
                      ? props.topOfList.current.offsetTop - 56
                      : 0,
                    behavior: "instant",
                  });
                }}
                disabled={currentPage * itemsPerPage >= data.length}
              />
            </Pagination>
          </div>

          <ul className="noBullet noPadding">
            {displayData.map((entry) => (
              <li key={entry._id}>
                <Card className="my-2 noBorderCustomCard">
                  <Link
                    to={`/singleDebate/${entry._id}`}
                    className="text-decoration-none"
                    onClick={() =>
                      sessionStorage.setItem("scrollPosition", window.scrollY)
                    }
                  >
                    <Card.Body className="border-bottom px-0">
                      <Card.Text className="blueText m-0 onePointFiveRem cardTitle ">
                        {entry.topicTitle}
                      </Card.Text>

                      <Card.Text className="blackText mb-0">
                        {truncateDescription(entry.topicDescription)}
                      </Card.Text>
                      <Card.Text className="lightGreyText zeroPointEightRem mb-0 ">
                        {formatDate(entry.dateCreated)}
                      </Card.Text>
                    </Card.Body>
                  </Link>
                </Card>
              </li>
            ))}
          </ul>

          <div>
            <Pagination size="sm">
              <Pagination.Prev
                onClick={() => {
                  handlePageChange(currentPage - 1);
                  window.scrollTo({
                    top: props.topOfList.current
                      ? props.topOfList.current.offsetTop - 56
                      : 0,
                    behavior: "instant",
                  });
                }}
                disabled={currentPage === 1}
              />
              <Pagination size="sm">{items}</Pagination>
              <Pagination.Next
                onClick={() => {
                  handlePageChange(currentPage + 1);
                  window.scrollTo({
                    top: props.topOfList.current
                      ? props.topOfList.current.offsetTop - 56
                      : 0,
                    behavior: "instant",
                  });
                }}
                disabled={currentPage * itemsPerPage >= data.length}
              />
            </Pagination>
          </div>

          <div>
            <Button
              className="me-1 mb-1"
              onClick={() => {
                handlePageChange(currentPage - 1);
                window.scrollTo({
                  top: props.topOfList.current
                    ? props.topOfList.current.offsetTop - 56
                    : 0,
                  behavior: "instant",
                });
              }}
              disabled={currentPage === 1}
            >
              Previous Page
            </Button>
            <Button
              className="me-1 mb-1"
              onClick={() => {
                handlePageChange(currentPage + 1);
                window.scrollTo({
                  top: props.topOfList.current
                    ? props.topOfList.current.offsetTop - 56
                    : 0,
                  behavior: "instant",
                });
              }}
              disabled={currentPage * itemsPerPage >= data.length}
            >
              Next Page
            </Button>
            {/* <Button
              className="me-1 mb-1"
              onClick={() => {
                handlePageChange(1);
                window.scrollTo({
                  top: props.topOfList.current
                    ? props.topOfList.current.offsetTop - 56
                    : 0,
                  behavior: "instant",
                });
              }}
              disabled={currentPage === 1}
            >
              Return to page one
            </Button> */}
          </div>
        </div>
      ) : (
        // Display the Spinner while data is loading
        <div className="col">
          <Spinner animation="grow" variant="info" className="sticky-spinner" />
        </div>
      )}
    </div>
  );
}
