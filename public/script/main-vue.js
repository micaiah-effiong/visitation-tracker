new Vue({
  el: "#app",
  data: {
    searchResult: {
      one: [],
      two: [],
    },
    visitForm: {
      directedTo: "",
      email: "",
      purpose: "",
    },
    result: "",
  },
  created: function () {},
  methods: {
    searchInput: function (evt, searchBox) {
      let { value: val } = evt.target;
      if (!val) {
        return searchBox === "search"
          ? (this.searchResult.one = [])
          : (this.searchResult.two = []);
      }
      fetch("/users?select=id,name,email&name[like]=" + val)
        .then((res) => res.json())
        .then((res) => {
          searchBox === "search"
            ? (this.searchResult.one = res.data)
            : (this.searchResult.two = res.data);
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
          this.result = "done";
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
