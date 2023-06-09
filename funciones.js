/**
 * Calcula los totales de cada producto de factura A
 * @method calculoA
 * @param {number} fila - Contiene el valor del input que ingresa el usuario de cantidad de productos
 */
function calculoA(fila) {
    const cant = parseFloat(fila.querySelector(' .cantidad').value)||0;
    const pUnit=parseFloat(fila.querySelector(' .precio').value) || 0;
    const iva = parseFloat(fila.querySelector('.iva').value)||0;
    if (isNaN(pUnit)|| isNaN(cant)||pUnit<0||cant<0){
        alert('Los valores ingresados no pueden ser valores negativos ni letras');
        fila.querySelector(' .cantidad').value=' ';
        fila.querySelector(' .precio').value=' ';
        fila.querySelector('.iva').value=' ';
        fila.querySelector(' .IVA').value=' ';
        return;
    }
    const subt = cant*pUnit;
    const cantIva = (subt*iva)/100;
    const total=subt+cantIva;


    fila.querySelector(' .ivaCalculado input').value= cantIva.toFixed(2);
    fila.querySelector(' .total input').value=total.toFixed(2);
}
/**
 * Calcula los totales de cada producto de factura B/C
 * @method calculoB
 * @param {number} fila - Contiene el valor del input que ingresa el usuario de cantidad de productos
 */
function calculoB(fila){
    const cant = parseFloat(fila.querySelector(' .cantidad').value)||0;
    const pUnit=parseFloat(fila.querySelector(' .precio').value) || 0;


    if (isNaN(pUnit)|| isNaN(cant)||pUnit<0||cant<0){
        alert('Los valores ingresados no pueden ser valores negativos ni letras');
        fila.querySelector(' .cantidad').value=' ';
        fila.querySelector(' .precio').value=' ';
        return;
    }
    const total=cant*pUnit;
    fila.querySelector(' .totalB input').value=total.toFixed(2);
}
/**
 * Genera una TABLA en la factura A(filas:cantidad de productos ingresados; columnas: datos del producto)
 * @method generarTablaA
 */
function generarTablaA(){
    let cantFilas = document.getElementById('cant_de_itemns').value;
    if (isNaN(cantFilas)||cantFilas<=0){
        alert('Por favor ingrese un valor numerico positivo');
        document.getElementById("cant_de_itemns").value = "";
        return;
    }


    window.location.href='Factura_A.html?filas=' +cantFilas;
}
/**
 * crea una tabla con un número determinado de filas y celdas utilizando los parámetros de la URL,
 * y establece clases y atributos en los elementos para permitir su manipulación posterior, como el cálculo del IVA y el total
 * @method cargarPaginaA
 * @param {number} cuerpoTabla1 - Variable utilizada para representar objetos o elementos de tabla en el documento HTML
 */
function cargarPaginaA(cuerpoTabla1 = cuerpoTabla) {
    let url= new URLSearchParams(window.location.search);
    let cantFilas = url.get('filas');

    let tbody=document.createElement('cuerpoTabla');
    for (let i=0; i<cantFilas; i++){
        let fila = cuerpoTabla1.insertRow(i);


        let descripcionCell=fila.insertCell(0);
        let descripcionId= "Descripcion_" +(i+1);
        descripcionCell.innerHTML= '<input type="text" name="Descripcion" placeholder="Descripcion" class="descripcion" id="' + descripcionId +'">'


        let cantidadCell=fila.insertCell(1);
        let cantidadId='Cantidad_' + (i+1);
        cantidadCell.innerHTML=' <input type="number" name="Cantidad" placeholder="Cant" class="cantidad" id="' + cantidadId +'" onchange="calculoA(this.parentNode.parentNode)" >'


        let precioUnitarioCell = fila.insertCell(2);
        let pUnitId='PrecUnit_' + (i+1);
        precioUnitarioCell.innerHTML='<input type="number" name="PrecUnit" placeholder="Precio unit." class="precio" id="' + pUnitId +'" onchange="calculoA(this.parentNode.parentNode)">'


        let ivaCell = fila.insertCell(3);
        let cantIvaId='cantIva_' + (i+1);
        ivaCell.innerHTML='<select name="porDeIva" class="iva" onchange="calculoA(this.parentNode.parentNode)" id="' + cantIvaId +'">\n' +
            '                <option value="0">0%</option>\n' +
            '                <option value="10.5">10.5%</option>\n' +
            '                <option value="21">21%</option>\n' +
            '                <option value="27">27%</option>\n' +
            '              </select>'


        let ivaCaluladoCell=fila.insertCell(4);
        let ivaCalculadoId='IVA_' + (i+1);
        ivaCaluladoCell.innerHTML='<input type="text" name="IVA" placeholder="IVA" class="Civa" id="' + ivaCalculadoId +'" readonly>'
        ivaCaluladoCell.classList.add('ivaCalculado');


        let totalCell=fila.insertCell(5);
        let totalId='Total_' + (i+1);
        totalCell.innerHTML='<input type="text" name="Total" placeholder="Total" id="' + totalId +'" class="total" readonly>';
        totalCell.classList.add('total');
    }
}
/**
 * Genera una TABLA en la factura B (filas:cantidad de productos ingresados; columnas: datos del producto)
 * @method generarTablaB
 */
function generarTablaB(){
    let cantFilas = document.getElementById('cant_de_itemns').value;
    if (isNaN(cantFilas)||cantFilas<=0){
        alert('Por favor ingrese un valor numerico positivo');
        document.getElementById("cant_de_itemns").value = "";
        return;
    }
    window.location.href='FacturaB_C.html?filas=' +cantFilas;
}
/**
 * crea una tabla con un número determinado de filas y celdas utilizando los parámetros de la URL,
 * y establece clases y atributos en los elementos para permitir su manipulación posterior, como el cálculo del IVA y el total
 * @method cargarPaginaB
 */
function cargarPaginaB(cuerpoTabla2=cuerpoTablaB){
    let url= new URLSearchParams(window.location.search);
    let cantFilas = url.get('filas');


    let tbody=document.createElement('cuerpoTablaB');
    for (let i=0; i<cantFilas; i++){
        let fila = cuerpoTabla2.insertRow(i);


        let descripcionCell=fila.insertCell(0);
        let descripcionId='Descripcion_' + (i+1);
        descripcionCell.innerHTML= '<input type="text" name="Descripcion" placeholder="Descripcion" class="descripcion" id="' + descripcionId +'">'

        let cantidadCell=fila.insertCell(1);
        let cantidadId='cant_' + (i+1);
        cantidadCell.innerHTML=' <input type="number" name="Cantidad" placeholder="Cant" class="cantidad" id="' + cantidadId +'" onchange="calculoB(this.parentNode.parentNode)">'

        let precioUnitarioCell = fila.insertCell(2);
        let preUnitId='pUnit_' + (i+1);
        precioUnitarioCell.innerHTML='<input type="number" name="PrecUnit" placeholder="Precio unit." class="precio" id="' + preUnitId +'" onchange="calculoB(this.parentNode.parentNode)">'

        let totalCell=fila.insertCell(3);
        let totalId='total_' + (i+1);
        totalCell.innerHTML=' <input type="text" name="Total" placeholder="Total" class="total" id="' + totalId +'" readonly>';
        totalCell.classList.add('totalB');
    }
}
/**
 * Obtiene los datos del vendedor para enviarselos al canvas
 * @method enviarDatosComprador
 */

function enviarDatosVendedor() {
    let nombre = document.getElementById("vendedorNombre").value;
    let cuit = document.getElementById("vendedorCuit").value;
    let actividad = document.getElementById("vendedorActividad").value;


    let datosVendedor = {
        nombre: nombre,
        cuit : cuit,
        actividad : actividad
    };

    if(!nombre || isNaN(cuit) || !actividad){
        alert("Complete todos los datos antes de avanzar")
    } else{
        sessionStorage.setItem('datosVendedorFor', JSON.stringify(datosVendedor));
        window.location.href = 'DatosComprador.html';
    }

}

/**
 * Obtiene los datos del comprador para enviarselos al canvas
 * @method enviarDatosComprador
 */
function enviarDatosComprador(){
    let nombre=document.getElementById("compradorNombre").value;
    let cuit=document.getElementById("compradorCuit").value;
    let telefono=document.getElementById("compradorTelefono").value;
    let direccion=document.getElementById("compradorDireccion").value;


    let datosComprador ={
        nombre:nombre,
        cuit: cuit,
        telefono: telefono,
        direccion:direccion
    };
    if (!nombre || isNaN(cuit)||isNaN(telefono)||!direccion){
        alert ("Complete todos los campos antes de avanzar")
    } else{
        sessionStorage.setItem('datosCompradorFor', JSON.stringify(datosComprador));
        window.location.href='ItemsAIngresar.html';
    }
}

/**
 * Obtiene la información de los productos del formulario de la factura de tipo A
 * @method enviarDatos
 */
function enviarDatos(){
    let cuerpoTabla=document.getElementById('cuerpoTabla');
    let filas=cuerpoTabla.getElementsByTagName('tr');


    let produtos=[];
    let verificarCampos=false;


    for (let i=0; i<filas.length; i++){
        let descripcion=filas[i].querySelector(' .descripcion').value;
        let cantidad = parseFloat(filas[i].querySelector(' .cantidad').value);
        let precioUnitario=parseFloat(filas[i].querySelector(' .precio').value);
        let selectorIva=filas[i].querySelector(' .iva');
        let iva=parseFloat(selectorIva.options[selectorIva.selectedIndex].value);
        let ivaCalculado = parseFloat(filas[i].querySelector(' .ivaCalculado input').value);
        let total = parseFloat(filas[i].querySelector(' .total input').value);


        let producto ={
            descripcion: descripcion,
            cantidad: cantidad,
            precioUnitario: precioUnitario,
            iva: iva,
            ivaCalculado: ivaCalculado,
            total: total
        };
        produtos.push(producto);


        if (!descripcion||isNaN(cantidad)||isNaN(precioUnitario)||isNaN(iva)||isNaN(ivaCalculado)||isNaN(total)){
            verificarCampos=true;
            break;
        }
    }


    if (verificarCampos){
        alert("Faltan productos o informacion de los mismos");
    }else{
        sessionStorage.setItem('productos', JSON.stringify(produtos));
        window.location.href='Factura_final.html';
    }


}
/**
 * Dibuja en un lienzo CANVAS la informacion de la factura A
 * @method dibujarCanvas
 */
function dibujarCanvas() {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'blue';
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    ctx.font = 'bold 15px Helvetica';
    let productos = JSON.parse(sessionStorage.getItem('productos'));
    let datosVendedor = sessionStorage.getItem('datosVendedorFor');
    let datosComprador = sessionStorage.getItem('datosCompradorFor');
    if (datosVendedor || datosComprador) {
         datosVendedor = JSON.parse(datosVendedor);
         datosComprador = JSON.parse(datosComprador);


        let x = 10;
        let y = 10;
        let espacio = 20;


        // Información del vendedor
        ctx.fillText('Información del vendedor', x, y);
        ctx.fillText('Nombre: ' + datosVendedor.nombre, x, y + espacio);


        // Mostrar información gradualmente con setInterval
        let contador = 0;
        let intervalo = setInterval(function() {
            contador++;


            if (contador >= 2) {
                ctx.fillText('Nro de CUIT: ' + datosVendedor.cuit, x, y + espacio * 2);
            }


            if (contador >= 3) {
                ctx.fillText('Actividad Principal: ' + datosVendedor.actividad, x, y + espacio * 3);


                // Información del comprador
                ctx.fillText('Información del comprador', x, y + espacio * 5);
                ctx.fillText('Nombre: ' + datosComprador.nombre, x, y + espacio * 6);
            }


            if (contador >= 4) {
                ctx.fillText('Nro de CUIT: ' + datosComprador.cuit, x, y + espacio * 7);
            }


            if (contador >= 5) {
                ctx.fillText('Teléfono: ' + datosComprador.telefono, x, y + espacio * 8);
            }


            if (contador >= 6) {
                ctx.fillText('Dirección: ' + datosComprador.direccion, x, y + espacio * 9);


                // Encabezados de la tabla
                ctx.fillText('Descripción', x, y + espacio * 11);
                ctx.fillText('Cantidad', x + 200, y + espacio * 11);
                ctx.fillText('Precio Unitario', x + 300, y + espacio * 11);
                ctx.fillText('IVA', x + 450, y + espacio * 11);
                ctx.fillText('IVA Total', x + 550, y + espacio * 11);
                ctx.fillText('Total', x + 650, y + espacio * 11);
            }


            if (contador >= 7) {
                // Productos
                for (let i = 0; i < productos.length; i++) {
                    let descripcion = productos[i].descripcion;
                    let cantidad = productos[i].cantidad;
                    let precioUnitario = productos[i].precioUnitario;
                    let iva = productos[i].iva;
                    let ivaCalculado = productos[i].ivaCalculado;
                    let total = productos[i].total;


                    ctx.fillText(descripcion, x, y + espacio * (12 + i));
                    ctx.fillText(cantidad, x + 200, y + espacio * (12 + i));
                    ctx.fillText(precioUnitario, x + 300, y + espacio * (12 + i));
                    ctx.fillText(iva + '%', x + 450, y + espacio * (12 + i));
                    ctx.fillText(ivaCalculado.toFixed(2), x + 550, y + espacio * (12 + i));
                    ctx.fillText(total.toFixed(2), x + 650, y + espacio * (12 + i));
                }


                // Se ha mostrado toda la información, se puede detener el setInterval
                clearInterval(intervalo);
            }
        }, 1000); // Intervalo de 1 segundo
    }
}
/**
 * Obtiene la información de los productos del formulario de la factura de tipo B/C
 * @method enviarDatosB
 */
function enviarDatosB(){
    let cuerpoTablaB=document.getElementById('cuerpoTablaB');
    let filasB=cuerpoTablaB.getElementsByTagName('tr');


    let produtosB=[];
    let validarCampos=false;
    for (let i=0; i<filasB.length; i++){
        let descripcion=filasB[i].querySelector(" .descripcion").value;
        let cantidad = parseFloat(filasB[i].querySelector(" .cantidad").value);
        let precioUnitario=parseFloat(filasB[i].querySelector(" .precio").value);
        let total = parseFloat(filasB[i].querySelector(" .totalB input").value);


        let productoB ={
            descripcion: descripcion,
            cantidad: cantidad,
            precioUnitario: precioUnitario,
            total: total
        };
        produtosB.push(productoB);
        if (!descripcion || isNaN(cantidad)||isNaN(precioUnitario)||isNaN(total)){
            validarCampos=true;
            break;
        }
    }
    if (validarCampos){
        alert("Complete todos los datos");
    }else{
        sessionStorage.setItem('productosB', JSON.stringify(produtosB));
        window.location.href='Factura_finalB.html';
    }

}

/**
 * Dibuja en un lienzo CANVAS la informacion de la factura B/C
 * @method dibujarCanvasB
 */
function dibujarCanvasB() {
    let canvasB = document.getElementById('canvasB');
    let ctx = canvasB.getContext('2d');
    ctx.fillStyle = 'blue';
    ctx.clearRect(0, 0, canvasB.width, canvasB.height);

    ctx.font = 'bold 15px Helvetica';
    let productosB = JSON.parse(sessionStorage.getItem('productosB'));
    let datosVendedor = JSON.parse(sessionStorage.getItem('datosVendedorFor'));
    let datosComprador = JSON.parse(sessionStorage.getItem('datosCompradorFor'));
    let xB = 10;
    let yB = 10;
    let espacio = 20;
    let contador = 0;

    let intervalo = setInterval(function () {
        contador++;

        if (contador === 1) {
            // Información del vendedor
            ctx.fillText('Información del vendedor', xB, yB);
            ctx.fillText('Nombre: ' + datosVendedor.nombre, xB, yB + espacio);
        } else if (contador === 2) {
            ctx.fillText('Nro de CUIT: ' + datosVendedor.cuit, xB, yB + espacio * 2);
        } else if (contador === 3) {
            ctx.fillText('Actividad Principal: ' + datosVendedor.actividad, xB, yB + espacio * 3);
            yB += espacio * 5; // Espacio adicional entre la información del vendedor y del comprador

            // Información del comprador
            ctx.fillText('Información del comprador', xB, yB);
            ctx.fillText('Nombre: ' + datosComprador.nombre, xB, yB + espacio);
        } else if (contador === 4) {
            ctx.fillText('Nro de CUIT: ' + datosComprador.cuit, xB, yB + espacio * 2);
        } else if (contador === 5) {
            ctx.fillText('Teléfono: ' + datosComprador.telefono, xB, yB + espacio * 3);
        } else if (contador === 6) {
            ctx.fillText('Dirección: ' + datosComprador.direccion, xB, yB + espacio * 4);

            yB += espacio * 6; // Espacio adicional entre la información del comprador y los productos

            // Encabezados de la tabla
            ctx.fillText('Descripción', xB, yB);
            ctx.fillText('Cantidad', xB + 200, yB);
            ctx.fillText('Precio Unitario', xB + 300, yB);
            ctx.fillText('Total', xB + 450, yB);


        } else if (contador === 7) {
            // Productos
            for (let i = 0; i < productosB.length; i++) {
                yB += espacio;
                let descripcion = productosB[i].descripcion;
                let cantidad = productosB[i].cantidad;
                let precioUnitario = productosB[i].precioUnitario;
                let total = productosB[i].total;

                ctx.fillText(descripcion, xB, yB);
                ctx.fillText(cantidad, xB + 200, yB);
                ctx.fillText(precioUnitario, xB + 300, yB);
                ctx.fillText(total.toFixed(2), xB + 450, yB);


            }
            // Se ha mostrado toda la información, se puede detener el setInterval
            clearInterval(intervalo);
        }
    }, 1000);
}



/**
 * Valida el nombre del vendedor
 * @method validarNombreV
 */
function validarNombreV() {
    let nombre = document.getElementById("vendedorNombre").value;


    if (!isNaN(nombre)) {
        alert("No se pueden ingresar números en el nombre. Por favor, ingresa un nombre válido.");
        document.getElementById("vendedorNombre").value = "";
    }
}
/**
 * Valida el nombre del comprador
 * @method validarNombreC
 */
function validarNombreC() {
    let nombre = document.getElementById("compradorNombre").value;


    if (!isNaN(nombre)) {
        alert("No se pueden ingresar números en el nombre. Por favor, ingresa un nombre válido.");
        document.getElementById("compradorNombre").value = "";
    }
}
/**
 * Valida el cuit del vendedor
 * @method validarCuitV
 */
function validarCuitV() {
    let cuit = document.getElementById("vendedorCuit").value;


    if (cuit<0) {
        alert("No se pueden ingresar números negativos en el CUIT. Por favor, ingresa un número válido.");
        document.getElementById("vendedorCuit").value = "";
    }
}
/**
 * Valida el cuit del comprador
 * @method validarCuitC
 */
function validarCuitC() {
    let cuit = document.getElementById("compradorCuit").value;


    if (cuit<0|| isNaN(cuit)) {
        alert("No se pueden ingresar números negativos en el CUIT ni LETRAS. Por favor, ingresa un número válido.");
        document.getElementById("compradorCuit").value = "";
    }
}
/**
 * Valida la actividad del vendedor
 * @method validarActividad
 */
function validarActividad() {
    let actividad = document.getElementById("vendedorActividad").value;


    if (!isNaN(actividad)) {
        alert("No se pueden ingresar números en la actividad principal. Por favor, ingresa una actividad válida.");
        document.getElementById("vendedorActividad").value = "";
    }
}
/**
 * Valida el telefono del comprador
 * @method validarTelefono
 */
function validarTelefono (){
    let telefono = document.getElementById("compradorTelefono").value;


    if (telefono<0){
        alert("No se pueden ingresar números negativos en el Telefono. Por favor, ingresa un telefono válido.");
        document.getElementById("compradorTelefono").value = "";
    }
}
/**
 * Valida la direccion del comprador
 * @method validarDireccion
 */
function validarDireccion (){
    let direccion = document.getElementById("compradorDireccion").value;
    if (!isNaN(direccion)) {
        alert("No se pueden ingresar números en la la direccion. Por favor, ingresa una direccion válida.");
        document.getElementById("compradorDireccion").value = "";
    }
}

/**
 * Descarga la factura tipo B/C como imagen
 * @method DescargarImagenB
 */
function DescargarImagenB(){
    let canvasB = document.getElementById('canvasB');
    let imgData = canvasB.toDataURL('image/png');
    let link = document.createElement('a');
    link.href = imgData;
    link.download = 'FacturaB.png';
    link.click();

}
/**
 * Descarga la factura tipo A como imagen
 * @method DescargarImagenA
 */
function DescargarFacturaA(){
    let canvas = document.getElementById('canvas');
    let imgData = canvas.toDataURL('image/png');
    let link = document.createElement('a');
    link.href = imgData;
    link.download = 'FacturaA.png';
    link.click();
}