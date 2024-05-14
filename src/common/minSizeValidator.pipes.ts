import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class MinSizeValidatorPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if(!value) {
            throw new BadRequestException('El archivo es requerido');
        }
        const minSize = 1000;
        
        if(value.size < minSize) {
            throw new BadRequestException(`El tamaño del archivo debe ser mayor a ${minSize} bytes`);
        }
        return value;
    }
}