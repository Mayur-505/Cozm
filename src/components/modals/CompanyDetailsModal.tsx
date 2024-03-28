import closeIcon from "@/assets/closeIcon.svg";
import questionIcon from "@/assets/questionIcon.svg";
import { searchAddressByName } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import InputWithLabel from "../common/InputWithLabel";
import { Modal } from "../common/Modal";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { AddressResult } from "@/lib/types";
import { Loader2 } from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const {
    name,
    street_name,
    postal_code,
    city,
    country,
    street_number,
    house_number,
  } = formValues;

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["address_by_company", { country: "UK", name: searchQuery }],
    queryFn: () => searchAddressByName({ country: "UK", name: searchQuery }),
    enabled: false,
  });

  const handleClose = () => {
    setFormValues(initialValue);
    setSearchQuery("");
    setShowOptions(false);
    onClose();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      setSearchQuery(value);
    }
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        setShowOptions(true);
        refetch();
      } else {
        setShowOptions(false);
      }
    }, 700);

    return () => clearTimeout(timer);
  }, [searchQuery, refetch]);

  const handleSelectAddress = (item: AddressResult) => {
    setFormValues((prev) => ({
      ...prev,
      name: item?.name || "",
      street_name: item?.street_name || "",
      postal_code: item?.postal_code || "",
      city: item?.city || "",
      country: item?.country || "",
      house_number: item?.house_number || "",
    }));
    setSearchQuery("");
  };

  return (
    <Modal
      title="Destination Company Address"
      isOpen={open}
      onClose={handleClose}
      className=""
    >
      <div className="grid grid-cols-2 gap-x-[73px] gap-y-[40px]  max-h-[500px] overflow-auto">
        <div className="relative">
          <InputWithLabel
            label="Name"
            id="name"
            name="name"
            onChange={handleChange}
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
          {showOptions && (
            <ScrollArea
              className={`!absolute shadow-[rgba(149,157,165,0.2)_0px_8px_24px] w-full top-full z-50 bg-white ${
                data && data?.length > 5 ? "min-h-[172px] h-full" : ""
              }`}
            >
              {isLoading ? (
                <div className="w-full h-10 flex justify-center items-center">
                  <Loader2 className="animate-spin h-4 w-4" />
                </div>
              ) : (
                <div className="flex p-1 flex-col h-full">
                  {data?.map((item, i) => {
                    return (
                      <p
                        className="p-2 cursor-pointer hover:bg-gray-50"
                        onClick={() => {
                          handleSelectAddress(item);
                        }}
                        key={i}
                      >
                        {item.name}
                      </p>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          )}
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
      <div className="flex justify-end items-center gap-5 mt-[70px]">
        <Button variant={"outline"} onClick={handleClose}>
          Close
        </Button>
        <Button>Add More</Button>
      </div>
    </Modal>
  );
};

export default CompanyDetailsModal;
