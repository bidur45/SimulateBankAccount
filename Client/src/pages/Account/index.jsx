import { ProCard, ProForm, ProFormText } from "@ant-design/pro-components";
import { Button, notification, Table, Typography } from "antd";
import { useEffect, useRef, useState } from "react";

import API from "../../services/SimulateBankAccount/index";
const { Title } = Typography;

export default () => {
  const formRef = useRef(null);
  const [action, setAction] = useState("A");
  const [accounts, setAccounts] = useState([]);
  const [loadSubmit, setLoadSubmit] = useState(false);

  const columns = [
    {
      title: "Account No",
      dataIndex: "acctNo",
      width: "20",
    },
    {
      title: "Account Holder Name",
      dataIndex: "accountHolderName",
      width: "40",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      width: "40",
    },
  ];

  const reset = async () => {
    await formRef.current?.resetFields();
    setAction("A");
  };

  const onSuccess = async (res) => {
    setLoadSubmit(false);
    await reset();
    notification["success"]({
      message: "Success",
      description: res?.message,
    });
    await getAccounts();
  };

  const onFailed = (res) => {
    setLoadSubmit(false);
    notification["error"]({
      message: "Error",
      description: res?.message,
    });
  };

  const submit = async (values) => {
    const data = {
      ...values,
    };
    setLoadSubmit(true);
    try {
      const resAccountSave = await API.account.post(data);
      resAccountSave && resAccountSave?.isSuccess === true
        ? onSuccess(resAccountSave)
        : onFailed(resAccountSave);
    } catch (ex) {
      setLoadSubmit(false);
      notification["error"]({
        message: "Error",
        description: ex.message,
      });
    }
  };

  const getAccounts = async () => {
    const resAccount = await API.account.get();
    setAccounts(resAccount?.data?.map((x) => ({ ...x })));
  };

  useEffect(() => {
    const useFetchData = async () => {
      await getAccounts();
    };
    useFetchData();
  }, []);

  return (
    <>
      <ProCard key="page" direction="row" ghost gutter={16}>
        <ProCard key="list" colSpan={10} ghost>
          <Typography.Title level={3}>Accounts</Typography.Title>
          <Table
            dataSource={accounts}
            columns={columns}
            bordered
            rowKey="acctNo"
            size="small"
          />
        </ProCard>
        <ProCard key="form" colSpan={16}>
          <ProForm
            onFinish={submit}
            formRef={formRef}
            params={{ id: "100" }}
            formKey="Account-form"
            submitter={{
              render: (props, dom) => [
                <Button
                  type="primary"
                  key="submit"
                  loading={loadSubmit}
                  onClick={() => props.form?.submit?.()}
                >
                  Create Account
                </Button>,
                <Button type="default" key="reset" onClick={reset}>
                  Reset
                </Button>,
              ],
            }}
            autoFocusFirstInput
          >
            <Title level={3}>Create Accounts</Title>
            <ProForm.Group>
              <ProFormText name="acctNo" hidden />
              <ProFormText
                width="md"
                name="accountHolderName"
                placeholder=""
                required
                label="Account Holder Name"
                rules={[
                  {
                    required: true,
                    message: "Account Holder Name is required",
                  },
                ]}
              />
            </ProForm.Group>
          </ProForm>
        </ProCard>
      </ProCard>
    </>
  );
};
