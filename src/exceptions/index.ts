import { GrpcException, GrpcStatus } from '@/utils/grpc-exception.util';
import { ErrorMessage } from './error-message';
import { ErrorCode } from './error-code';

export class PointsNotEnoughException extends GrpcException {
  constructor() {
    super(ErrorMessage[ErrorCode.POINTS_NOT_ENOUGH], GrpcStatus.FAILED_PRECONDITION, ErrorCode.POINTS_NOT_ENOUGH);
  }
}

export class InvalidPointAmountException extends GrpcException {
  constructor() {
    super(ErrorMessage[ErrorCode.INVALID_POINT_AMOUNT], GrpcStatus.INVALID_ARGUMENT, ErrorCode.INVALID_POINT_AMOUNT);
  }
}
