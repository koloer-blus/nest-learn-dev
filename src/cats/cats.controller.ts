import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
@Controller('cats')
export class CatsController {
  @Get('name-*')
  findAll(@Req() req): string {
    return 'This Cat is new';
  }
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return 'this is  a new Cat';
  }
}
