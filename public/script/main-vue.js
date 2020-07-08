new Vue({
  el: "#app",
  data: {
    search: "",
    search2: "",
    searchResult: [],
    searchResult2: [],
    visitForm: {
      directedTo: "",
      email: "",
      purpose: "",
    },
    result: "",
  },
  // created: {},
  methods: {
    searchInput: function (searchBox) {
      console.log(searchBox);

      fetch("/users?select=id,name,email&name[like]=" + this[searchBox])
        .then((res) => res.json())
        .then((res) => {
          searchBox === "search"
            ? (this.searchResult = res.data)
            : (this.searchResult2 = res.data);
        })
        .catch(console.log);
    },
    submitVisit: function () {
      fetch("/visits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.visitForm),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.data);
          this.result = "done";
          return res;
        })
        .catch((err) => {
          this.return = "An error occurred";
          console.error(error, "An error occurred");
        });
    },
    setInput: function (value, target) {
      if (value) {
        this.visitForm.email = value;
      }
      if (target) {
        this.visitForm.directedTo = target;
      }
    },
  },
});
