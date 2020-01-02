import React, { useState } from "react";
import MdAdd from "@material-ui/icons/Add";
import MdEdit from "@material-ui/icons/Edit";
import MdStar from "@material-ui/icons/Star";
import MdFavo from "@material-ui/icons/Favorite";
import MdArrowUpward from "@material-ui/icons/ArrowDownward";
import {
    FloatingMenu,
    MainButton,
    ChildButton,
} from "react-floating-button-menu";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export const TestButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [direction, setDirection] = useState("up");
    return (
        <>
            <FormControl>
                <InputLabel>Direction</InputLabel>
                <Select
                    value={direction}
                    onChange={event => {
                        const { value } = event.target;
                        setDirection(String(value));
                    }}
                    inputProps={{
                        name: "direction",
                    }}
                >
                    <MenuItem value="up">Up</MenuItem>
                    <MenuItem value="down">Down</MenuItem>
                    <MenuItem value="left">Left</MenuItem>
                    <MenuItem value="right">Right</MenuItem>
                </Select>
            </FormControl>
            <FloatingMenu
                slideSpeed={500}
                direction={direction}
                isOpen={isOpen}
                spacing={8}
                onMouseEnter={() => {
                    setIsOpen(true);
                }}
                onMouseLeave={() => {
                    setIsOpen(false);
                }}
            >
                <MainButton
                    iconResting={
                        <MdAdd style={{ fontSize: 30, color: "#ffffff" }} />
                    }
                    iconActive={
                        <MdArrowUpward style={{ fontSize: 30, color: "#ffffff" }} />
                    }
                    background="linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
                    onClick={() => {
                        setIsOpen(!isOpen);
                    }}
                    size={70}
                />
                <ChildButton
                    icon={<MdEdit style={{ fontSize: 30, color: "#ffffff" }} />}
                    background="linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
                    size={50}
                    onClick={() => console.log("First button clicked")}
                />
                <ChildButton
                    icon={<MdFavo style={{ fontSize: 30, color: "#ffffff" }} />}
                    background="linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
                    size={50}
                />
                <ChildButton
                    icon={<MdStar style={{ fontSize: 30, color: "#ffffff" }} />}
                    background="linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
                    size={50}
                />
            </FloatingMenu>
        </>
    );
};
