import React from "react";
import { updateQuantity } from "@/redux/cartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "../ui/use-toast";

export const useAppDispatch: () => AppDispatch = useDispatch;

export const Quantity = ({
  quantity,
  id,
}: {
  quantity: number | undefined;
  id: string;
}) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const onQuantityChange = (value: string) => {
    dispatch(updateQuantity({ quantity: +value, id: id }));
    toast({ title: "Product quantity updated successfully." });
  };

  return (
    <div className="flex items-center gap-2">
      <p>Quantity</p>
      <Select onValueChange={(value) => onQuantityChange(value)}>
        <SelectTrigger className="w-max mt-2">
          <SelectValue placeholder={quantity} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">1</SelectItem>
          <SelectItem value="2">2</SelectItem>
          <SelectItem value="3">3</SelectItem>
          <SelectItem value="4">4</SelectItem>
          <SelectItem value="5">5</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
