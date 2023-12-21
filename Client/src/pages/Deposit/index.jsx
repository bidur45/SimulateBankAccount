import {
  ProCard,
  ProForm,
  ProFormDigit,
  ProFormSelect,
} from "@ant-design/pro-components";
import { Button, notification, Typography } from "antd";
import { useEffect, useRef, useState } from "react";

import API from "../../services/SimulateBankAccount/index";
const { Title } = Typography;

export default () => {
  const formRef = useRef(null);
  const [loadSubmit, setLoadSubmit] = useState(false);
  const [accounts, setAccounts] = useState([]);

  const reset = async () => {
    await formRef.current?.resetFields();
  };

  const onSuccess = async (res) => {
    setLoadSubmit(false);
    await reset();
    notification["success"]({
      message: "Success",
      description: res?.message,
    });
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
      const resDepositSave = await API.deposit.post(data);
      resDepositSave && resDepositSave?.isSuccess === true
        ? onSuccess(resDepositSave)
        : onFailed(resDepositSave);
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
    setAccounts(
      resAccount?.data?.map((x) => ({
        value: x?.acctNo,
        label: x?.accountHolderName,
      }))
    );
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
        <ProCard key="form" colSpan={16}>
          <ProForm
            onFinish={submit}
            formRef={formRef}
            params={{ id: "100" }}
            formKey="Deposit-form"
            submitter={{
              render: (props, dom) => [
                <Button
                  type="primary"
                  key="submit"
                  loading={loadSubmit}
                  onClick={() => props.form?.submit?.()}
                >
                  Deposit
                </Button>,
                <Button type="default" key="reset" onClick={reset}>
                  Reset
                </Button>,
              ],
            }}
            autoFocusFirstInput
          >
            <Title level={3}>Deposit</Title>
            <ProForm.Group>
              <ProFormSelect
                options={accounts}
                width="md"
                name="acctNo"
                required
                label="Account"
                rules={[
                  {
                    required: true,
                    message: "Account is required",
                  },
                ]}
              />
              <ProFormDigit
                name="balance"
                label="Balance"
                initialValue={0}
                rules={[
                  {
                    required: true,
                    message: "Balance is required",
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
