import { registerEnumType as gqlRegisterEnumType } from '@nestjs/graphql';

export enum TransactionType {
  EARN = 'EARN',
  REDEEM = 'REDEEM',
}

registerEnumType(TransactionType, {
  name: 'TransactionType',
});
function registerEnumType(enumType: object, options: { name: string }) {
  gqlRegisterEnumType(enumType, options);
}
