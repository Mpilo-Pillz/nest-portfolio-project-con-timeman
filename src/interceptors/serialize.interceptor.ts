import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { UserDto } from 'src/users/dtos/user.dto';

export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // somethig before the request is handled

    return next.handle().pipe(
      map((data: any) => {
        // run beforme the data is sent out
        return plainToClass(UserDto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
