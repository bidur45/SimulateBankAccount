import api from "../genericService";

export default {
  auth: api("/Auth"),
  account: api("/Account"),
  deposit: api("/Deposit"),
  withdraw: api("/Withdrawal"),
};
