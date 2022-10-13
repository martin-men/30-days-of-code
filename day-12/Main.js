import { Mask_Validation } from "./Mask_Validation.js";
import { Subnetting } from "./Subnetting.js";

let subnetting = new Subnetting();
let maskValidation = new Mask_Validation();
let flag = true, opt, mask, hosts;

while (flag) {
    opt = prompt('Ingrese una opcion:\n' +
        '1. Obtener numero de hosts\n' +
        '2. Obtener mascara de red\n' +
        '3. Obtener clase de red en base a hosts\n' + 
        '4. Obtener clase de red en base a mascara\n' +
        '5. Salir');
    
    switch (opt) {
        case '1':
            mask = prompt('Ingrese la mascara de red:');

            if (maskValidation.validateMask(mask)) {
                hosts = subnetting.getHosts(mask);
                alert(`El numero de hosts es: ${hosts}`);
            } else {
                alert('Mascara invalida');
            }

            break;

        case '2':
            hosts = Number(prompt('Ingrese el numero de hosts:'));
            
            if (hosts >= 0) {
                mask = subnetting.getMask(hosts);
                alert(`La mascara de red es: ${mask}`);
            } else {
                alert('Numero de hosts invalido');
            }

            break;

        case '3':
            hosts = Number(prompt('Ingrese el numero de hosts:'));

            if (hosts >= 0) {
                alert(`La clase de red es: ${subnetting.getClassHosts(hosts)}`);
            } else {
                alert('Numero de hosts invalido');
            }

            break;

        case '4':
            mask = prompt('Ingrese la mascara de red:');

            if (maskValidation.validateMask(mask)) {
                alert(`La clase de red es: ${subnetting.getClassMask(mask)}`);
            } else {
                alert('Mascara invalida');
            }

            break;

        case '5':
            flag = false;
            break;

        default:
            alert('Opcion invalida');
            break;
    }
}