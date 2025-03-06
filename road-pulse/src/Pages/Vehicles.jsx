import React, {useEffect, useState }from "react";
import dayjs from "dayjs";
import axios from "axios";
import { Table, Button, Space, Modal, Form, Input, Select} from 'antd';


const { Option } = Select;

const VehiclesData = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [form] = Form.useForm();

  const handleEdit = (record) => {
    setEditingVehicle(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingVehicle(null);
  };

  const DeleteVehicle = async (vehicle) => {
    try {
      await axios.delete(`http://localhost:9000/vehicles/delete/${vehicle.id}`);
      setIsModalVisible(false);
      setData((prevData) => prevData.filter((item) => item.id !== vehicle.id));
      message.success("Vehicle deleted successfully");

    } catch (error) {
      message.error("Error deleting vehicle");
    }
  };
  
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(`http://localhost:9000/vehicles/edit/${editingVehicle.id}`, {
        new_brand_name: values.brand_name,
        new_fuel_type: values.fuel_type,
      });
      setData((prevData) =>
        prevData.map((item) =>
          item.id === editingVehicle.id
            ? { ...item, brand_name: values.brand_name, fuel_type: values.fuel_type }
            : item
        )
      );
      setIsModalVisible(false);
      message.success("Vehicle updated successfully");

    } catch (error) {
      message.error("Error updating vehicle");
    }
  };
  
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:9000/vehicles");
      const formattedData = response.data.map((item) => ({
        ...item,
        key: item.id,
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


const columns = [
  { title: "ID", dataIndex: "id", key: "id" },  
  { title: "Name", dataIndex: "name", key: "name" },  
  { title: "Brand", dataIndex: "brand_name", key: "brand_name" },  
  { title: "Vehicle Type", dataIndex: "vehicle_type", key: "vehicle_type" },  
  { title: "Fuel Type", dataIndex: "fuel_type", key: "fuel_type" },  
  { title: "Manufacturing Year", dataIndex: "manufacturing_year", key: "manufacturing_year" },  
  { title: "Registration Year", dataIndex: "registration_year", key: "registration_year" },  
  { title: "Country", dataIndex: "country_name", key: "country_name" }, 
  { title: "Total Count", dataIndex: "total_count", key: "total_count" ,render: (value) => new Intl.NumberFormat("en-US").format(value)},
  { title: "Created At", dataIndex: "createdAt", key: "createdAt",render: (date) => dayjs(date).format("YYYY-MM-DD") },
  { title: "Actions", key: "actions",render: (text, record) => (
      <Space>
        <Button type="primary" size="small" onClick={() => handleEdit(record)} >Edit</Button>
        <Button style={{color:"white", background: "#D11A2A", border: "none"}} size="small"  onClick={() => DeleteVehicle(record)}>Delete</Button>
      </Space>
    ),
  },
  ];
  return (
    
    <>
        <h5 className="mb-3" >Vehicles</h5>
          <Table
            columns={columns}
            dataSource={data}
            size="small"
            scroll={{ x: true }}
            style={{
            overflowX: "auto",
              padding: "8px",
              borderRadius: "5px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              width: "100%",
              maxHeight: "38em"
            }}
      />
      <Modal
        title="Edit Vehicle"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="brand_name" label="Brand Name" rules={[{ required: true, message: "Brand is required" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="fuel_type" label="Fuel Type" rules={[{ required: true, message: "Fuel type is required" }]}>
            <Select>
              <Option value="Electric">Electric</Option>
              <Option value="Fuel">Fuel</Option>
              <Option value="Hybrid">Hybrid</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
        
    </>
  );
};

export default VehiclesData;
