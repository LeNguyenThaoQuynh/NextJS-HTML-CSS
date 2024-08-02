import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: number;
  imageUrl: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'gio_hang';

  // Thông tin của products
  products: Product[] = [
    {
      id: 1,
      name: 'Son YSL Psychedelic Chilli',
      price: 1250000,
      inStock: 10,
      imageUrl: 'assets/ysl-416-Psychedelic.jpg',
    },
    {
      id: 2,
      name: 'Son YSL Lost In Marais',
      price: 1550000,
      inStock: 5,
      imageUrl: 'assets/Son-YSL-145-Lost-In-Marais.png',
    },
    {
      id: 3,
      name: 'Son YSL Take My Red Away',
      price: 1750000,
      inStock: 7,
      imageUrl: 'assets/son-YSL-120-Take-My-Red-Away.jpg',
    },
  ];

  cart: CartItem[] = [];

  // Thêm sản phẩm vào giỏ hàng
  addToCart(index: number): void {          // dùng void vì phương thức không trả về giá trị nào
    const product = this.products[index];   // Lấy sản phẩm từ danh sách sản phẩm dựa trên chỉ số `index`
    let found = false;                      // found được khởi tạo là false, có nghĩa là sản phẩm chưa được tìm thấy trong giỏ hàng.

    for (let i = 0; i < this.cart.length; i++) {  
      if (this.cart[i].id === product.id) {        // Kiểm tra xem sản phẩm hiện tại trong giỏ hàng có cùng ID với sản phẩm được thêm vào
        this.cart[i].quantity += 1;               // Nếu có, tăng số lượng của sản phẩm trong giỏ hàng lên 1.
        found = true;         // Nếu sản phẩm được tìm thấy trong giỏ hàng, 'found' sẽ được đặt thành true và vòng lặp sẽ dừng lại
        break;
      }
    }

    if (!found) {
      this.cart.push({ id: product.id, 
              name: product.name,
              price: product.price,
              quantity: 1,
            });
    }

    if (product.inStock > 0) {  // Kiểm tra xem sản phẩm còn hàng tồn kho không.
      product.inStock--;
    }
    
    console.log(this.cart);
  }


  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart(index: number): void {
    const cartItem = this.cart[index];    // Lấy sản phẩm cần xóa từ giỏ hàng theo chỉ số `index`
    
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === cartItem.id) {
        this.products[i].inStock += cartItem.quantity;      // this.products[i].inStock: SL hàng tồn kho hiện tại của sản phẩm ở vị trí i trong danh sách products
        break;                                              // cartItem.quantity: Đây là số lượng của sản phẩm trong giỏ hàng mà chúng ta đang xóa.
      }
    }
    this.cart.splice(index, 1);
    console.log(this.cart);
  }


  // Tính tổng giá tiền của các sản phẩm trong giỏ hàng
  getTotalPrice(): number {
    let total = 0;
    for (const item of this.cart) {
      total += item.price * item.quantity;
    }
    return total;
  }
}