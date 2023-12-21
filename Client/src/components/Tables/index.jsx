import { Button, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";

const Tabless = ({ dataSource, columns, changedData, action, formRef }) => {
    const [data, setData] = useState(dataSource);
    const [cols, setCols] = useState([]);

    const handleDelete = (key) => {
        const newData = data.filter((item) => item.key !== key);
        setData(newData);
    };

    const handleAdd = () => {
        if (action == "add") {
            const formValue = formRef.current.getFieldValue();
            setData([...data, formValue.address]);
            formRef.current.setFieldsValue({
                address: "",
            });
        }
        if (action == "cont") {
            const formValue = formRef.current.getFieldValue();
            if (formValue.contacts) {
                setData([...data, formValue.contacts]);
                formRef.current.setFieldsValue({
                    contact: "",
                });
            }
        }
        if (action == "doc") {
            const formValue = formRef.current.getFieldValue();
            setData([...data, formValue.document]);
            formRef.current.setFieldsValue({
                document: "",
            });
        }
    };
    useEffect(() => {
        changedData(data);
        setCols([
            {
                title: "S.No.",
                width: "5%",
                render: (_, __, z) => z + 1,
            },
            ...columns,
            {
                title: "operation",
                dataIndex: "operation",
                render: (_, record) => {
                    return (
                        <span>
                            <Popconfirm
                                title="Sure to delete?"
                                onConfirm={() => handleDelete(record.key)}
                            >
                                <a>Delete</a>
                            </Popconfirm>
                        </span>
                    );
                },
            },
        ]);
    }, [data]);
    return (
        <div>
            <Button
                onClick={handleAdd}
                type="primary"
                style={{
                    marginBottom: 16,
                }}
            >
                Add
            </Button>
            <Table dataSource={dataSource} columns={cols} />
        </div>
    );
};

export default Tabless;
