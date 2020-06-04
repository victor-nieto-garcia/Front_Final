import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../service/producto.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../Models/producto';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  producto: Producto= null;
  constructor(private productoService: ProductoService,
    private toastr:ToastrService,
    private activatedRoute:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.productoService.detail(id).subscribe(
      data=> {
        this.producto=data;
            },
    err=> {
      this.toastr.error('Error','Fail', {
        timeOut: 3000
      });
      this.volver();

    }
    );
  }

  volver(): void {
    this.router.navigate(['/']);
  }
}
