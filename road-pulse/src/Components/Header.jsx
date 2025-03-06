import React from "react";
import dayjs from "dayjs";
import { DatePicker } from 'antd';
import logo from "../assets/roadpulselogo.png";

const { RangePicker } = DatePicker;
const Header = () => {
  return (
    <>
        <header className="text-white text-left">
            <div className="row align-items-center">
            <div className="col-md-5 col-sm-2 logo text-start">
                <img src={logo} alt="Logo" />
            </div>
            <div className="col-md-6 col-sm-10 mt-1 text-end">
                <span className="text-black me-3">Select Range:</span>
                <RangePicker  defaultValue={[ dayjs().subtract(1, "year").startOf("year"), dayjs().subtract(1, "year").endOf("year")]} format="YYYY-MM-DD" style={{width: "20em"}}/>
            </div>

            </div>
        </header>
    </>
  );
};

export default Header;
