import { Meta, PageInfo } from "graphql/types";

export interface IDAble {
  id: string;
}

const usePaginator = (metaData: Meta, arr: IDAble[]) => {
  console.log(arr);
};
