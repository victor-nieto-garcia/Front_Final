import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../service/producto.service';
import { Producto } from '../Models/producto';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {

  nombre: '';
  precio: number= null;
  constructor(private productoService:ProductoService,
    private toastr:ToastrService,
    private router:Router
    ) { }

  ngOnInit(): void {
    
  }

onCreate(): void { 
  const producto= new Producto(this.nombre,this.precio);
  this.productoService.save(producto).subscribe(
    data=>{ 
      this.toastr.success('Producto Creado','Ok', {
        timeOut: 3000
      });
      this.router.navigate(['/']);
    },
    err=>{
      this.toastr.error('Error','Fail', {
        timeOut: 3000
      });
      this.router.navigate(['/']);

    }
  )

}


}
