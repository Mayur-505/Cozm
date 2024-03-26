import closeIcon from "@/assets/closeIcon.svg";
import questionIcon from "@/assets/questionIcon.svg";
import { searchAddressByName } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import InputWithLabel from "../common/InputWithLabel";
import { Modal } from "../common/Modal";
import { Button } from "../ui/button";

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
  house_number: ""
};

const CompanyDetailsModal = ({ onClose, open }: CompanyDetailsModalProps) => {
  const [formValues, setFormValues] = useState(initialValue);

  const { data } = useQuery({
    queryKey: ["address_by_company", { country: "UK", name: formValues.name }],
    queryFn: () =>
      searchAddressByName({ country: "UK", name: formValues.name }),
    enabled: open && formValues.name.length > 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
        house_number: value.house_number
      }));
    }
  }, [data]);

  const { name, street_name, postal_code, city, country, street_number, house_number } =
    formValues;

  return (
    <Modal
      title="Destination Company Address"
      isOpen={open}
      onClose={onClose}
      className="max-w-[912px]"
    >
      <div className="grid grid-cols-2 gap-x-[73px] gap-y-[40px]">
        <InputWithLabel
          label="Name"
          id="name"
          name="name"
          onChange={handleChange}
          value={name}
          placeholder="Lorem ipsum"
          inputWithIcon={
            <div className="flex items-center gap-[10px] w-[60px] justify-end">
              {name && <img src={closeIcon} alt="closeIcon" onClick={() => setFormValues({ ...initialValue, name : "" })} />} 
              <img src={questionIcon} alt="questionIcon" />
            </div>
          }
          isRequired
        />
        <InputWithLabel
          label="Location"
          id="location"
          name="location"
          placeholder="Lorem ipsum"
          value={house_number || ""}
          onChange={handleChange}
          inputWithIcon={
            <div className="flex items-center gap-[10px] w-[60px] justify-end">
              {house_number && <img src={closeIcon} alt="closeIcon" onClick={() => setFormValues({ ...initialValue, house_number : "" })} />}
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
              {street_name && <img src={closeIcon} alt="closeIcon" onClick={() => setFormValues({ ...initialValue, street_name : "" })} />}
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
              {street_number && <img src={closeIcon} alt="closeIcon" onClick={() => setFormValues({ ...initialValue, street_number : "" })} />} 
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
              {postal_code && <img src={closeIcon} alt="closeIcon" onClick={() => setFormValues({ ...initialValue, postal_code : "" })} />}
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
              {city && <img src={closeIcon} alt="closeIcon" onClick={() => setFormValues({ ...initialValue, city : "" })} />}
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
              {country && <img src={closeIcon} alt="closeIcon" onClick={() => setFormValues({ ...initialValue, country : "" })} />}
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
