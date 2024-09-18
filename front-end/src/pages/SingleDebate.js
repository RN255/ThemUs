import React from "react";

export default function SingleDebate() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div>The title of this debate</div>
          </div>
        </div>
        <div className="row">
          <div className="col bg-primary mx-1">
            <div>Yes</div>
          </div>
          <div className="col bg-danger mx-1">
            <div>No</div>
          </div>
        </div>
        <div className="row">
          <div className="col mx-1">
            <ul>
              <li>First comment</li>
              <li>Second comment</li>
              <li>Third comment</li>
            </ul>
          </div>
          <div className="col mx-1">
            <ul>
              <li>First comment</li>
              <li>Second comment</li>
              <li>Third comment</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
