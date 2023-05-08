import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // somethig before the request is handled

    console.log('Running before the handler', context);

    return next.handle().pipe(
      map((data: any) => {
        // run beforme the data is sent out
        console.log('Running before the response is sent out', data);
      }),
    );
  }
}
