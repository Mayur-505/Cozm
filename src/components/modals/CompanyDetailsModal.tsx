import closeIcon from "@/assets/closeIcon.svg";
import questionIcon from "@/assets/questionIcon.svg";
import { searchAddressByName } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import InputWithLabel from "../common/InputWithLabel";
import { Modal } from "../common/Modal";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

type CompanyDetailsModalProps = {
  open: boolean;
  onClose: () => void;
};

const initialValue: {
  name: string;
  street_name: string | null;
  postal_code: string;
  city: string;
  country: string;
  street_number: string | null;
  house_number: string | null;
} = {
  name: "",
  street_name: "",
  postal_code: "",
  city: "",
  country: "",
  street_number: "",
  house_number: "",
};

const CompanyDetailsModal = ({ onClose, open }: CompanyDetailsModalProps) => {
  const [formValues, setFormValues] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["address_by_company", { country: "UK", name: formValues.name }],
    queryFn: () =>
      searchAddressByName({ country: "UK", name: formValues.name }),
    enabled: open && formValues.name.length > 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      setIsOpen(true);
    }
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (data && data[0]) {
      const value = data[0];
      setFormValues((prev) => ({
        ...prev,
        name: value.name,
        street_name: value.street_name,
        postal_code: value.postal_code,
        city: value.city,
        country: value.country,
        house_number: value.house_number,
      }));
    }
  }, [data]);

  const {
    name,
    street_name,
    postal_code,
    city,
    country,
    street_number,
    house_number,
  } = formValues;
  console.log("isOpenisOpen", isOpen);

  return (
    <Modal
      title="Destination Company Address"
      isOpen={open}
      onClose={onClose}
      className="max-w-[912px]"
    >
      <div className="grid grid-cols-2 gap-x-[73px] gap-y-[40px]">
        <div className="relative">
          <InputWithLabel
            label="Name"
            id="name"
            name="name"
            onChange={handleChange}
            onClick={(e) => {
              e.stopPropagation();
            }}
            value={name}
            placeholder="Lorem ipsum"
            inputWithIcon={
              <div className="flex items-center gap-[10px] w-[60px] justify-end">
                {name && (
                  <img
                    src={closeIcon}
                    alt="closeIcon"
                    onClick={() =>
                      setFormValues((prev) => ({ ...prev, name: "" }))
                    }
                  />
                )}
                <img src={questionIcon} alt="questionIcon" />
              </div>
            }
            isRequired
          />
          <ScrollArea className="min-h-[172px] !absolute shadow-[rgba(149,157,165,0.2)_0px_8px_24px] w-full top-full">
          <div className=" z-50 p-2.5 rounded-[10px] bg-white flex flex-col gap-2 h-full">
            <p>Hello</p>
            <p>Hello</p>

            <p>Hello</p>
            <p>Hello</p>
            <p>Hello</p>
            <p>Hello</p>
            <p>Hello</p>
            <p>Hello</p>

          </div>
          </ScrollArea>
        </div>

        <InputWithLabel
          label="Location"
          id="location"
          name="location"
          placeholder="Lorem ipsum"
          value={house_number || ""}
          onChange={handleChange}
          inputWithIcon={
            <div className="flex items-center gap-[10px] w-[60px] justify-end">
              {house_number && (
                <img
                  src={closeIcon}
                  alt="closeIcon"
                  onClick={() =>
                    setFormValues((prev) => ({ ...prev, house_number: "" }))
                  }
                />
              )}
              <img src={questionIcon} alt="questionIcon" />
            </div>
          }
          isRequired
        />
        <InputWithLabel
          label="Street Name"
          id="street_name"
          name="street_name"
          placeholder="Lorem ipsum"
          onChange={handleChange}
          value={street_name || ""}
          inputWithIcon={
            <div className="flex items-center gap-[10px] w-[60px] justify-end">
              {street_name && (
                <img
                  src={closeIcon}
                  alt="closeIcon"
                  onClick={() =>
                    setFormValues((prev) => ({ ...prev, street_name: "" }))
                  }
                />
              )}
              <img src={questionIcon} alt="questionIcon" />
            </div>
          }
          isRequired
        />
        <InputWithLabel
          label="Street Number"
          id="street_number"
          name="street_number"
          placeholder="Lorem ipsum"
          onChange={handleChange}
          value={street_number || ""}
          inputWithIcon={
            <div className="flex items-center gap-[10px] w-[60px] justify-end">
              {street_number && (
                <img
                  src={closeIcon}
                  alt="closeIcon"
                  onClick={() =>
                    setFormValues((prev) => ({ ...prev, street_number: "" }))
                  }
                />
              )}
              <img src={questionIcon} alt="questionIcon" />
            </div>
          }
          isRequired
        />
        <InputWithLabel
          label="Post Code"
          id="post_code"
          name="post_code"
          placeholder="Lorem ipsum"
          onChange={handleChange}
          value={postal_code || ""}
          inputWithIcon={
            <div className="flex items-center gap-[10px] w-[60px] justify-end">
              {postal_code && (
                <img
                  src={closeIcon}
                  alt="closeIcon"
                  onClick={() =>
                    setFormValues((prev) => ({ ...prev, postal_code: "" }))
                  }
                />
              )}
              <img src={questionIcon} alt="questionIcon" />
            </div>
          }
          isRequired
        />
        <InputWithLabel
          label="Town / City"
          id="town_city"
          name="town_city"
          placeholder="Lorem ipsum"
          onChange={handleChange}
          value={city || ""}
          inputWithIcon={
            <div className="flex items-center gap-[10px] w-[60px] justify-end">
              {city && (
                <img
                  src={closeIcon}
                  alt="closeIcon"
                  onClick={() =>
                    setFormValues((prev) => ({ ...prev, city: "" }))
                  }
                />
              )}
              <img src={questionIcon} alt="questionIcon" />
            </div>
          }
          isRequired
        />
        <InputWithLabel
          label="Country"
          id="country"
          name="country"
          placeholder="Lorem ipsum"
          onChange={handleChange}
          value={country || ""}
          inputWithIcon={
            <div className="flex items-center gap-[10px] w-[60px] justify-end">
              {country && (
                <img
                  src={closeIcon}
                  alt="closeIcon"
                  onClick={() =>
                    setFormValues((prev) => ({ ...prev, country: "" }))
                  }
                />
              )}
              <img src={questionIcon} alt="questionIcon" />
            </div>
          }
          isRequired
        />
      </div>
      <div className="flex justify-end items-center gap-5 mt-[90px]">
        <Button variant={"outline"} onClick={onClose}>
          Close
        </Button>
        <Button>Add More</Button>
      </div>
    </Modal>
  );
};

export default CompanyDetailsModal;
