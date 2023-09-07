import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule} from "./users/users.module";
import { AuthModule } from './auth/auth.module';
import { CategoriasModule } from './categorias/categorias.module';
import { SubcategoriasModule } from './subcategorias/subcategorias.module';
import { EstadosModule } from './estados/estados.module';
import { PoblacionesModule } from './poblaciones/poblaciones.module';
import { AnunciosModule } from './anuncios/anuncios.module';
import { ProvinciasModule } from './provincias/provincias.module';
import { FotosModule } from './fotos/fotos.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3307,
      username: "root",
      password: "3912481",
      database: "users",
      autoLoadEntities: true,
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/public/images'), // Ruta a la carpeta 'public' en la raíz del proyecto
      serveRoot: '/images', // Ruta base para servir archivos estáticos
    }),
    UsersModule,
    AuthModule,
    CategoriasModule,
    SubcategoriasModule,
    EstadosModule,
    PoblacionesModule,
    AnunciosModule,
    ProvinciasModule,
    FotosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
