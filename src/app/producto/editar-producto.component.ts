import { Component, OnInit } from '@angular/core';
import { Producto } from '../Models/producto';
import { ProductoService } from '../service/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  producto: Producto= null;
  constructor(private productoService: ProductoService,
    private toastr:ToastrService,
    private activatedRoute:ActivatedRoute,
    private router:Router ){ }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.productoService.detail(id).subscribe(
      data=>{
        this.producto=data;
      },
      err =>{
        this.toastr.error(err.error, 'fail', {timeOut:3000, positionClass: 'toast-top-center'})
      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.productoService.update(id, this.producto).subscribe(  data=>{ 
      this.toastr.success('Producto Actualizado','Ok', {
        timeOut: 3000
      });
      this.router.navigate(['/']);
    },
    err=>{
      this.toastr.error('Error','Fail', {
        timeOut: 3000
      });
      this.router.navigate(['/']);

    })
  }
}