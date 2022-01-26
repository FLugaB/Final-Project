import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../Hooks/helpers";
import { fetchHistoryOrder } from "../../store/actionCreator/customers";

const HistoryOutlet = () => {
  const { customerOrder } = useSelector((state) => state.customers);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchOrder();
  }, [dispatch]);

  useEffect(() => {
    if (customerOrder.length >= 1) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchOrder = async () => {
    try {
      await dispatch(fetchHistoryOrder());
    } catch (error) {
      console.log(error);
    }
  };

  console.log(customerOrder);

  return (
    <div className="inner-scroll ">
      {!isLoading && customerOrder.length < 1 && (
        <div className="titleStyle">
          <h2>You don't have a History Order yet...</h2>
        </div>
      )}

      {!isLoading && customerOrder.length >= 1 && (
        <table className="containerTable1 ">
          <thead>
            <tr>
              <th>
                <h1>#ID</h1>
              </th>
              <th>
                <h1>Order ID</h1>
              </th>
              <th>
                <h1>Status</h1>
              </th>
              <th>
                <h1>Date</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            {customerOrder.map((el) => {
              return (
                <tr key={el.id}>
                  <td className="text-center">{el.id}</td>
                  <td className="text-center">{el.order_id}</td>
                  <td className="text-center">{el.status}</td>
                  <td className="text-center">{formatDate(el.updatedAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoryOutlet;