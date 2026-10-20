/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------

// F1. Bộ đếm "Đang hiển thị x/y tin" trong #bo-dem.
const oTimKiem = document.getElementById("o-tim-kiem");
const danhSach = document.getElementById("list");
const boDem = document.getElementById("bo-dem");
const khongThay = document.getElementById("khong-thay");

function capNhatLoc() {
	const tuKhoa = oTimKiem.value.toLowerCase();
	let soHien = 0;
	for (const muc of danhSach.querySelectorAll("li")) {
		const vanBan = muc.querySelector("h3").textContent + " " + muc.querySelector("p").textContent;
		const khop = vanBan.toLowerCase().includes(tuKhoa);
		muc.classList.toggle("an", !khop);
		if (khop) soHien++;
	}
	boDem.textContent = `Đang hiển thị ${soHien}/${danhSach.querySelectorAll("li").length} tin`;
	khongThay.classList.toggle("an", soHien !== 0);
	if (soHien === 0) {
		khongThay.textContent = `Không tìm thấy tin nào cho "${oTimKiem.value}"`;
	}
}

// F2 + F3. Lọc tin khi gõ vào #o-tim-kiem (sự kiện keyup) và thông báo #khong-thay.
oTimKiem.addEventListener("keyup", capNhatLoc);

// F4. Nút "Read more >>" / "Thu gọn <<" — MỘT trình lắng nghe đặt trên #list.
danhSach.addEventListener("click", (e) => {
	if (!e.target.matches("button.more")) return;
	const doan = e.target.parentElement.querySelector("p");
	const dangMo = doan.classList.toggle("day-du");
	e.target.textContent = dangMo ? "Thu gọn <<" : "Read more >>";
});

// F5. Nút #nut-dang: kiểm tra dữ liệu, tạo <li> mới, chèn vào đầu #list.
document.getElementById("nut-dang").addEventListener("click", () => {
	const oTieuDe = document.getElementById("tin-tieu-de");
	const oNoiDung = document.getElementById("tin-noi-dung");
	const baoLoi = document.getElementById("bao-loi");
	if (oTieuDe.value === "" || oNoiDung.value === "") {
		baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
		return;
	}
	const mucMoi = document.createElement("li");
	const thoiGian = document.createElement("span");
	thoiGian.className = "time";
	thoiGian.textContent = homNay();
	const tieuDe = document.createElement("h3");
	tieuDe.textContent = oTieuDe.value;
	const noiDung = document.createElement("p");
	noiDung.textContent = oNoiDung.value;
	const nut = document.createElement("button");
	nut.type = "button";
	nut.className = "more";
	nut.textContent = "Read more >>";
	mucMoi.append(thoiGian, tieuDe, noiDung, nut);
	danhSach.prepend(mucMoi);
	oTieuDe.value = "";
	oNoiDung.value = "";
	baoLoi.textContent = "";
	capNhatLoc();
});

capNhatLoc();
