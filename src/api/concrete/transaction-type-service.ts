// Dosya: /src/api/concrete/TransactionTypeApi.ts

import { CreateTransactionTypeDto } from "@/dto/transaction_type/request/create-transaction-type.dto";
import { UpdateTransactionTypeDto } from "@/dto/transaction_type/request/update-transaction-type.dto";
import { TransactionTypeResponseDto } from "@/dto/transaction_type/response/transaction-type-response.dto";
import { CreateTransactionTypeResponseDto } from "../../dto/transaction_type/response/create-transaction-type-response.dto";
import { UpdateTransactionTypeResponseDto } from "../../dto/transaction_type/response/update-transaction-type-response.dto";
import BaseApi from "../base/axiosHelper";

export default class TransactionTypeApi extends BaseApi {
  constructor(baseURL: string) {
    super(`${baseURL}/transaction-types`);
  }

  async create(
    dto: CreateTransactionTypeDto
  ): Promise<CreateTransactionTypeResponseDto> {
    return this.post<CreateTransactionTypeDto>("", dto);
  }

  async getAll(): Promise<TransactionTypeResponseDto[]> {
    return this.get<TransactionTypeResponseDto[]>("");
  }

  async getById(id: string): Promise<TransactionTypeResponseDto> {
    return this.get<TransactionTypeResponseDto>(`/${id}`);
  }

  async update(
    id: string,
    dto: Partial<UpdateTransactionTypeDto>
  ): Promise<UpdateTransactionTypeResponseDto> {
    return this.patch<TransactionTypeResponseDto>(`/${id}`, dto);
  }

  async delete(id: string): Promise<void> {
    return this.remove(`/${id}`);
  }

  async getByCode(code: string): Promise<TransactionTypeResponseDto> {
    return this.get<TransactionTypeResponseDto>(`/code/${code}`);
  }
}
