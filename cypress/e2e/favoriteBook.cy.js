const bookFirst = {
  title: "Скрытые намерения",
  description: "ВСЕ МЫ В ЗАПАДНЕ. НО ВЫХОД ЕСТЬ.Так считают участники интернет-сообщества бунтарей «Стражи». Они убеждены, что общество задыхается в железной хватке насквозь коррумпированных влиятельных чиновников. По малейшим намекам и оговоркам в СМИ Стражи способны вычислить этих преступников. Да, те сильны. Но и на них найдется управа",
  author: "Майк Омер",
};

const bookSecond = {
  title: "Родная кровь",
  description:
    "В глубине штата Мэн, на берегу залива Атлантического океана, живёт провинциальной жизнью большой, но уединённый город Роар, в котором на протяжении трёх десятилетий орудует серийный убийца, носящий прозвище Больничный Стрелок…",
  author: "Anne Dar",
};

const bookThird = {
  title: "Ящик Скиннера",
  description:
    "ЗДЕСЬ ПСИХОЛОГИЯ СТАНОВИТСЯ ИГРОЙ, ИГРА – КВЕСТОМ, А КВЕСТ – СМЕРТЬЮ.Профайлер. После окончания университета Фан Му поступает на службу в полицию. Теперь он – профайлер, распутывающий самые сложные преступления… Но однажды его чутье не дает осечку.акторы заставляют одного человека говорить другому «да»? И какие методы наиболее эффективны, если необходимо добиться чужого согласия?",
  author: "Лэй Ми",
};

describe("Favorite book spec", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("test@test.com", "test");
  });

  it("Should add new book", () => {
    cy.addBook(bookFirst);
    cy.get(".card-title").should("contain.text", bookFirst.title);
  });

  it("Should add new book to favorite", () => {
    cy.addFavoriteBook(bookSecond);
    cy.visit("/favorites");
    cy.get(".card-title").should("contain.text", bookSecond.title);
  });

  it("Should add book to favorite through 'Book list' page", () => {
    cy.addBookNoFavorite(bookFirst);
    cy.contains(bookFirst.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.visit("/favorites");
    cy.contains(bookFirst.title).should("be.visible");
  });

  it("Should delete book from favorite", () => {
    cy.visit("/favorites");
    cy.contains(bookSecond.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.contains(bookSecond.title).should("not.exist");
  });
});