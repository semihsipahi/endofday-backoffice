import TransactionTypeApi from "../../api/concrete/transaction-type-service";

const baseURL = "http://localhost:3001/";
const transactionTypeApi = new TransactionTypeApi(baseURL);

export default transactionTypeApi;
