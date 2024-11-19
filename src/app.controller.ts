import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Konyv } from './konyv';
import { CreateKonyvDto } from './create-konyv.dto';
import { UpdateKonyvDto } from './update-konyv.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  konyvek: Konyv[] = [
    {
      id: 1,
      title: 'Elek élete',
      author: 'Teszt Elek',
      isbn: '1234567890',
      publishYear: 2024,
      reserved: true
    },
    {
      id: 2,
      title: 'A nagy pénzrablás - A professzor naplója',
      author: 'Sergio Marquina',
      isbn: '9087654321',
      publishYear: 2020,
      reserved: false
    },
    {
      id: 3,
      title: 'Vér a síneken',
      author: 'Barbara Nickless',
      isbn: '5192532055',
      publishYear: 2024,
      reserved: true
    }
  ];

  nextID = 4

  @Get('books')
  konyvekListazasa() {
    return this.konyvek
  }

  @Get('books/:id')
  konyvIDListazas(@Param('id') id: string) {
    const idSzam = parseInt(id);
    const konyv = this.konyvek.find(konyv => konyv.id == idSzam);
    if (!konyv) {
      throw new NotFoundException("Nincs ilyen ID-jű könyv")
    }
    return konyv;
  }

  @Delete('books/:id')
  @HttpCode(204)
  konyvTorles(@Param('id') id: string) {
    const idSzam = parseInt(id);
    const konyv = this.konyvek.findIndex(konyv => konyv.id == idSzam);
    if (!konyv) {
      throw new NotFoundException("Nincs ilyen ID-jű könyv")
    }
    this.konyvek.splice(konyv,1)
  }

  @Post('books')
  @HttpCode(201)
  ujKonyv(@Body() ujKonyvAdatok: CreateKonyvDto) {
    const ujKonyv: Konyv = {
      id: this.nextID,
      ...ujKonyvAdatok,
      reserved: false,
    }
    this.nextID++;
    this.konyvek.push(ujKonyv);
    return ujKonyv;
  }

  @Post('books/:id')
  @HttpCode(200)
  KonyvUpdate(@Param('id') id: string, @Body() KonyvUpdate: UpdateKonyvDto) {
    const idSzam = parseInt(id);
    const konyv = this.konyvek.findIndex(konyv => konyv.id == idSzam);
    if (!konyv) {
      throw new NotFoundException("Nincs ilyen ID-jű könyv")
    }
    const eredetiKonyv = this.konyvek[konyv];
    const KeszKonyv: Konyv = {
      ...eredetiKonyv,
      ...KonyvUpdate,
    };
    this.konyvek[konyv] = KeszKonyv;
    return KeszKonyv;
  }


}
