import { Button, Form, Input, Popconfirm, Table } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};
const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    Popconfirm,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);
    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };
    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({
                ...record,
                ...values,
            });
        } catch (errInfo) {
            console.log("Save failed:", errInfo);
        }
    };
    let childNode = children;
    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }
    return <td {...restProps}>{childNode}</td>;
};
const Tables = ({ dataSource, columns, options, changedData, action }) => {
    const [data, setData] = useState(dataSource);
    const [cols, setCols] = useState([]);
    const [workExperienceCount, setWorkExperienceCount] = useState(1);
    const [educationQualificationcount, setEducationQualificationCount] =
        useState(1);

    const handleDelete = (key) => {
        const newData = data.filter((item) => item.key !== key);
        setData(newData);
    };

    const handleSave = (row) => {
        const newData = [...data];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setData(newData);
    };
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const opts = options || [];
    const tbldel = opts.some((x) => x == "del");

    const handleAdd = () => {
        if (action == "edu") {
            const eduData = {
                key: educationQualificationcount,
                schoolOrUniversity: "school or university",
                qualification: "qualificatioon",
                level: "level",
                yearOfPassing: 2022,
            };
            setData([...data, eduData]);
            setEducationQualificationCount(educationQualificationcount + 1);
        } else {
            const workData = {
                key: workExperienceCount,
                companyName: "company",
                designation: "designation",
                salary: "salary",
                address: "address",
                jobDescription: "job Description",
            };
            setData([...data, workData]);
            setWorkExperienceCount(workExperienceCount + 1);
        }
    };
    useEffect(() => {
        changedData(data);
        setCols(
            [
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
                                {tbldel &&
                                    (data.length >= 0 ? (
                                        <Popconfirm
                                            title="Sure to delete?"
                                            onConfirm={() =>
                                                handleDelete(record.key)
                                            }
                                        >
                                            <a>Delete</a>
                                        </Popconfirm>
                                    ) : null)}
                            </span>
                        );
                    },
                },
            ].map((col) => {
                if (!col.editable) {
                    return col;
                }
                return {
                    ...col,
                    onCell: (record) => ({
                        record,
                        editable: col.editable,
                        dataIndex: col.dataIndex,
                        title: col.title,
                        handleSave,
                    }),
                };
            })
        );
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
            <Table
                components={components}
                rowClassName={() => "editable-row"}
                dataSource={dataSource}
                columns={cols}
            />
        </div>
    );
};

export default Tables;
