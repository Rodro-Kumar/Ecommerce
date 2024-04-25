import React, { useState } from "react";
import Card from "../../Common/Card";
import { newProductData } from "../../../Data/Data";
import Slider from "react-slick";
import Button from "../../Common/Button";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const NewArrival = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 414,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      },
    ],
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          background: "#979797",
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          position: "absolute",
          top: "40%",
          right: "0",
          transform: "translateY(-40%)",
        }}
        onClick={onClick}
      >
        <div>
          <GrFormNext className="text-4xl text-white" />
        </div>
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          background: "#979797",
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          position: "absolute",
          top: "40%",
          left: "0",
          transform: "translateY(-40%)",
          zIndex: "1",
        }}
        onClick={onClick}
      >
        <div>
          <GrFormPrevious className="text-4xl text-white" />
        </div>
      </div>
    );
  }

  const [productData, setproductData] = useState(newProductData);
  return (
    <>
      <div className="py-20 md:py-32 px-4 lg:px-0">
        <div className="container">
          <div>
            <h1 className="pb-12 text-primaryFontColor font-DMsans font-bold text-[30px] sm:text-[38px]">
              New Arrivals
            </h1>
          </div>

          <Slider {...settings}>
            {productData.map((item) => {
              return (
                <Card
                  key={item.id}
                  badge={
                    item.discount ? (
                      <Button
                        className={
                          "py-[4px] px-3 sm:py-[6px] sm:px-5 text-xs sm:text-base"
                        }
                      >
                        {item.discountStatus
                          ? item.discountStatus
                          : "Stock out"}
                      </Button>
                    ) : null
                  }
                  img={item.img}
                  productTitle={item.title}
                  price={item.price}
                  colorVariant={item.colorVariant ? item.colorVariant : null}
                />
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default NewArrival;