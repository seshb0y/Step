import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState, StatusFilterType } from "../redux/store";
import { changeStatusFilter } from "../redux/action";

const StatusFilter = () => {
  const dispatch = useDispatch();

  const filterStatus = useSelector((state: AppState) => state.filters.status);

  const handleClick = (status: StatusFilterType) => {
    dispatch(changeStatusFilter(status));
  };
  return (
    <div>
      <button
        onClick={() => handleClick("all")}
        className={`${filterStatus === "all" && "is-active"}`}
      >
        All
      </button>
      <button
        onClick={() => handleClick("active")}
        className={`${filterStatus === "active" && "is-active"}`}
      >
        Active
      </button>
      <button
        onClick={() => handleClick("completed")}
        className={`${filterStatus === "completed" && "is-active"}`}
      >
        Completed
      </button>
    </div>
  );
};

export default StatusFilter;
