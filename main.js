(() => {
  "use strict";
  const e = class {
      constructor(e, t, n, i, r) {
        (this.title = e),
          (this.project = t),
          (this.dueDate = n),
          (this.priority = i),
          (this.description = r);
      }
      addNote(e) {
        null == this.notes ? (this.notes = [e]) : this.notes.push(e);
      }
    },
    t = (function () {
      let t = {},
        i = [];
      n("localStorage")
        ? (null === localStorage.getItem("myTasks") &&
            ((t["Get started"] = [
              new e(
                "My task",
                "Get started",
                new Date().toJSON().slice(0, 10),
                "1",
                "Time to start logging the things I need to do!"
              ),
            ]),
            localStorage.setItem("myTasks", JSON.stringify(t))),
          (t = JSON.parse(localStorage.getItem("myTasks"))),
          Object.values(t).forEach((n) => {
            t[n[0].project] = n.map(
              (t) => (
                Object.assign(new Date(), t.dueDate),
                (t = Object.assign(new e(), t)),
                i.push(t),
                t
              )
            );
          }))
        : (i = [
            new e(
              "My task",
              "Get started",
              new Date(),
              "high",
              "Time to start logging the things I need to do!"
            ),
          ]);
      const r = function () {
          n("localStorage") &&
            localStorage.setItem("myTasks", JSON.stringify(t));
        },
        o = function (e) {
          e.sort(function (e, t) {
            return (
              new Date(e.dueDate) - new Date(t.dueDate) ||
              e.priority - t.priority
            );
          });
        };
      return {
        retrieveTasks: function () {
          return o(i), i;
        },
        saveTask: function (e) {
          void 0 === t[e.project]
            ? ((t[e.project] = []), t[e.project].push(e))
            : t[e.project].push(e),
            i.push(e),
            r();
        },
        taskIndex: function (e) {
          return t[e.project].indexOf(e);
        },
        deleteTask: function (e, n) {
          t[n].splice(e, 1), 0 == t[n].length && delete t[n], r();
        },
        saveTasks: r,
        editTask: function (e, n, i) {
          (t[e.project][i].title = n.get("title")),
            (t[e.project][i].project = n.get("project")),
            (t[e.project][i].dueDate = n.get("date")),
            (t[e.project][i].priority = n.get("priority")),
            (t[e.project][i].description = n.get("description"));
        },
        retrieveProjectList: function () {
          return Object.keys(t);
        },
        retrieveProjectTasks: function (e) {
          const n = t[e];
          return o(n), n;
        },
      };
    })();
  function n(e) {
    let t;
    try {
      t = window[e];
      const n = "__storage_test__";
      return t.setItem(n, n), t.removeItem(n), !0;
    } catch (e) {
      return (
        e instanceof DOMException &&
        (22 === e.code ||
          1014 === e.code ||
          "QuotaExceededError" === e.name ||
          "NS_ERROR_DOM_QUOTA_REACHED" === e.name) &&
        t &&
        0 !== t.length
      );
    }
  }
  const i = (function () {
      const n = document.getElementById("listOfTasks"),
        i = document.getElementById("newtask"),
        r = document.getElementById("dropdown"),
        o = function (e) {
          n.innerHTML = "";
          const i = document.createElement("div");
          i.classList.toggle("taskList"),
            e.forEach((e) => {
              const n = document.createElement("div"),
                r = t.taskIndex(e);
              n.setAttribute("index", r), n.classList.toggle(e.priority);
              const o = document.createElement("h2");
              o.innerText = e.title;
              const c = document.createElement("p");
              c.innerText = e.dueDate.slice(0, 10);
              const a = document.createElement("p");
              if (
                ((a.innerText = e.description),
                n.appendChild(o),
                n.appendChild(c),
                n.appendChild(a),
                null != e.notes)
              ) {
                const t = document.createElement("ul");
                e.notes.forEach((e) => {
                  const n = document.createElement("li");
                  (n.innerText = e), t.appendChild(n);
                }),
                  n.appendChild(t);
              }
              const l = document.createElement("button");
              (l.innerText = "Delete task"),
                l.addEventListener("click", function () {
                  confirm("Are you sure you wanna delete this task?") &&
                    (console.log(r),
                    t.deleteTask(r, e.project),
                    location.reload());
                }),
                n.appendChild(l);
              const d = s(e, r),
                u = document.createElement("button");
              (u.innerText = "Edit task"),
                u.addEventListener("click", function () {
                  d.classList.toggle("hidden");
                }),
                n.appendChild(u),
                n.appendChild(d),
                i.appendChild(n);
            }),
            n.appendChild(i);
        },
        s = function (e, n) {
          const i = document.createElement("form");
          i.classList.toggle("hidden"), i.classList.toggle("form");
          const r = document.createElement("label");
          (r.innerText = "Title: "), i.appendChild(r);
          const o = document.createElement("input");
          o.setAttribute("value", e.title),
            o.setAttribute("type", "text"),
            o.setAttribute("name", "title"),
            o.setAttribute("required", ""),
            i.appendChild(o);
          const s = document.createElement("label");
          (s.innerText = "Project: "), i.appendChild(s);
          const c = document.createElement("input");
          c.setAttribute("type", "text"),
            c.setAttribute("name", "project"),
            c.setAttribute("value", e.project),
            c.setAttribute("required", ""),
            c.setAttribute("list", "projects");
          const a = document.createElement("datalist");
          a.setAttribute("id", "projects"),
            t.retrieveProjectList().forEach((e) => {
              const t = document.createElement("option");
              t.setAttribute("value", e), a.appendChild(t);
            });
          const l = document.createElement("option");
          l.setAttribute("value", "Default"),
            a.appendChild(l),
            c.appendChild(a),
            i.appendChild(c);
          const d = document.createElement("label");
          (d.innerText = "Done by: "), i.appendChild(d);
          const u = document.createElement("input");
          u.setAttribute("value", e.dueDate),
            u.setAttribute("type", "date"),
            u.setAttribute("name", "date"),
            u.setAttribute("required", ""),
            u.setAttribute("min", new Date().toJSON().slice(0, 10)),
            u.setAttribute(
              "max",
              new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                .toJSON()
                .slice(0, 10)
            ),
            i.appendChild(u);
          const p = document.createElement("label");
          (p.innerText = "Priority: "), i.appendChild(p);
          const m = document.createElement("select");
          m.setAttribute("name", "priority"), m.setAttribute("required", "");
          const h = document.createElement("option");
          h.setAttribute("value", "1"),
            (h.innerText = "High"),
            m.appendChild(h);
          const b = document.createElement("option");
          b.setAttribute("value", "2"),
            (b.innerText = "Medium"),
            m.appendChild(b);
          const E = document.createElement("option");
          E.setAttribute("value", "3"),
            (E.innerText = "Low"),
            m.appendChild(E),
            i.appendChild(m),
            "1" == e.priority
              ? h.setAttribute("selected", "")
              : "2" == e.priority
              ? b.setAttribute("selected", "")
              : E.setAttribute("selected", "");
          const A = document.createElement("label");
          (A.innerText = "Description: "), i.appendChild(A);
          const g = document.createElement("textarea");
          g.classList.toggle("desc"),
            (g.innerText = e.description),
            g.setAttribute("name", "description"),
            g.setAttribute("type", "text"),
            g.setAttribute("required", ""),
            i.appendChild(g);
          const T = document.createElement("button");
          return (
            (T.innerText = "Edit task"),
            T.setAttribute("type", "submit"),
            i.appendChild(T),
            i.addEventListener("submit", function (i) {
              i.preventDefault();
              const r = new FormData(this);
              confirm("Are you sure you want to edit this task?") &&
                (t.editTask(e, r, n), t.saveTasks(), location.reload());
            }),
            i
          );
        };
      return {
        render: function (n) {
          o(n),
            (function () {
              const n = document.createElement("label");
              (n.innerText = "Title: "), i.appendChild(n);
              const r = document.createElement("input");
              r.setAttribute("type", "text"),
                r.setAttribute("name", "title"),
                r.setAttribute("required", ""),
                i.appendChild(r);
              const o = document.createElement("label");
              (o.innerText = "Project: "), i.appendChild(o);
              const s = document.createElement("input");
              s.setAttribute("type", "text"),
                s.setAttribute("name", "project"),
                s.setAttribute("required", ""),
                s.setAttribute("list", "projects");
              const c = document.createElement("datalist");
              c.setAttribute("id", "projects"),
                t.retrieveProjectList().forEach((e) => {
                  const t = document.createElement("option");
                  t.setAttribute("value", e), c.appendChild(t);
                }),
                s.appendChild(c),
                i.appendChild(s);
              const a = document.createElement("label");
              (a.innerText = "Done by: "), i.appendChild(a);
              const l = document.createElement("input");
              l.setAttribute("value", new Date().toJSON().slice(0, 10)),
                l.setAttribute("type", "date"),
                l.setAttribute("name", "date"),
                l.setAttribute("required", ""),
                l.setAttribute("min", new Date().toJSON().slice(0, 10)),
                l.setAttribute(
                  "max",
                  new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                    .toJSON()
                    .slice(0, 10)
                ),
                i.appendChild(l);
              const d = document.createElement("label");
              (d.innerText = "Priority: "), i.appendChild(d);
              const u = document.createElement("select");
              u.setAttribute("name", "priority"),
                u.setAttribute("required", "");
              const p = document.createElement("option");
              p.setAttribute("value", "1"),
                (p.innerText = "High"),
                u.appendChild(p);
              const m = document.createElement("option");
              m.setAttribute("value", "2"),
                (m.innerText = "Medium"),
                u.appendChild(m);
              const h = document.createElement("option");
              h.setAttribute("value", "3"),
                (h.innerText = "Low"),
                u.appendChild(h),
                i.appendChild(u);
              const b = document.createElement("label");
              (b.innerText = "Description: "), i.appendChild(b);
              const E = document.createElement("textarea");
              E.classList.toggle("desc"),
                E.setAttribute("name", "description"),
                E.setAttribute("type", "text"),
                E.setAttribute("required", ""),
                i.appendChild(E);
              const A = document.createElement("button");
              (A.innerText = "Create new task"),
                A.setAttribute("type", "submit"),
                i.appendChild(A),
                i.addEventListener("submit", function (n) {
                  n.preventDefault();
                  const i = new FormData(this),
                    r = new e(
                      i.get("title"),
                      i.get("project"),
                      i.get("date"),
                      i.get("priority"),
                      i.get("description")
                    );
                  t.saveTask(r), location.reload();
                });
            })(),
            (function () {
              const e = document.createElement("label");
              (e.innerText = "Select what project to view"), r.appendChild(e);
              const n = document.createElement("select");
              n.setAttribute("name", "project"),
                n.setAttribute("id", "project-select");
              const i = document.createElement("option");
              i.setAttribute("value", "all"),
                (i.innerText = "All projects"),
                n.appendChild(i),
                t.retrieveProjectList().forEach((e) => {
                  const t = document.createElement("option");
                  t.setAttribute("value", e),
                    (t.innerText = e),
                    n.appendChild(t);
                }),
                n.addEventListener("change", function (e) {
                  if ("all" != e.target.value) {
                    const n = t.retrieveProjectTasks(e.target.value);
                    o(n);
                  } else o(t.retrieveTasks());
                }),
                r.appendChild(n);
            })();
        },
      };
    })(),
    r = t.retrieveTasks();
  i.render(r);
})();
