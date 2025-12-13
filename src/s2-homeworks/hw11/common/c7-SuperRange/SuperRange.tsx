import React from "react";
import { Slider, SliderProps } from "@mui/material";

const SuperRange: React.FC<SliderProps> = (props) => {
  return (
    <Slider
      sx={{
        // стили для слайдера // пишет студент
        width: "300px",
        color: "#0066cc",
        "& .MuiSlider-thumb": {
          height: 18,
          width: 18,
          backgroundColor: "#fff",
          border: "2px solid currentColor",
          "&:hover": {
            boxShadow: "0 0 0 8px rgba(0, 102, 204, 0.16)",
          },
        },
        "& .MuiSlider-track": {
          height: 4,
          borderRadius: 2,
        },
        "& .MuiSlider-rail": {
          height: 4,
          borderRadius: 2,
          backgroundColor: "#d3d3d3",
        },
      }}
      {...props} // отдаём слайдеру пропсы если они есть (value например там внутри)
    />
  );
};

export default SuperRange;
