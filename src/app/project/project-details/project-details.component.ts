import { ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/providers/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "src/app/providers/app.service";
import { Component, OnInit } from "@angular/core";
import { AddTaskComponent } from "../add-task/add-task.component";


@Component({
  selector: "app-project-details",
  templateUrl: "./project-details.component.html",
  styleUrls: [
    "./project-details.component.css",
    "../../../vendor/libs/ngx-markdown-editor/ngx-markdown-editor.scss",
    "../../../vendor/libs/quill/typography.scss",
    "../../../vendor/libs/quill/editor.scss",
  ],
})
export class ProjectDetailsComponent implements OnInit {
  curOpt = "high";
  curTab: any;
  urlParams: any;
  closeResult: any;
  date: any;
  summary: any;
  assignee: any;
  reporter: any;
  status: any;
  comment: any;
  attachment: any;
  quillShow: Boolean;
  quillcommentShow: Boolean;
  quillData: String;
  task: {
    data: any;
    loading: Boolean;
  };
  addComment: {
    loading: Boolean;
  };
  editComment: {
    loading: Boolean;
  };
  viewComment: {
    loading: Boolean;
    data: any;
  };
  deleteComment: {
    loading: Boolean;
  };
  editTask: {
    loading: Boolean;
  };
  project: {
    data: any;
    loading: Boolean;
  };
  delete: {
    loading: Boolean;
  };
  user: {
    data: any;
    loading: Boolean;
  };
  constructor(
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.appService.pageTitle = "projectDetails - Task Management";
    this.urlParams = {};
    this.date = "";
    this.summary = "";
    this.assignee = "";
    this.reporter = "";
    this.status = "";
    this.task = {
      data: {},
      loading: false,
    };
    this.addComment = {
      loading: false,
    };
    this.editComment = {
      loading: false,
    };
    this.viewComment = {
      loading: false,
      data: {},
    };
    this.deleteComment = {
      loading: false,
    };
    this.editTask = {
      loading: false,
    };
    this.quillShow = false;
    this.quillcommentShow = false;
    this.project = {
      data: {},
      loading: false,
    };
    this.delete = {
      loading: false,
    };
    this.user = {
      data: {},
      loading: false,
    };
    this.quillData = "";
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.urlParams = data || "";
    });
    this.viewProject();
    this.userList();
  }

  viewProject() {
    this.project.loading = true;
    this.userService.viewProject(this.urlParams.id).subscribe(
      (res: any) => {
        this.project.loading = false;
        this.project.data = res[0] || [];
        this.getTask();
      },
      (err: any) => {
        this.project.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  getTask() {
    this.task.loading = true;
    let p = this.project.data._id;
    this.userService.taskList(p).subscribe(
      (res: any) => {
        this.task.loading = false;
        this.task.data = res || {};
        this.curTab = this.task.data[0];
        this.getcomment();
      },
      (err: any) => {
        this.task.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  onView(id: any) {
    this.router.navigate(["/tasks/view-task"], {
      queryParams: {
        id: id,
      },
    });
  }

  onAddTask() {
    this.open();
  }

  onDelete(id: any) {
    this.delete.loading = true;
    this.userService.deleteTask(id).subscribe(
      (res: any) => {
        this.delete.loading = false;
        this.toastr.success(res.data.message);
      },
      (err: any) => {
        this.delete.loading = false;
        this.toastr.error(err.error.message);
      }
    );
  }

  open() {
    this.modalService
      .open(AddTaskComponent, {
        windowClass: "modal-top modal-lg",
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  userList() {
    this.user.loading = true;
    this.userService.listUser().subscribe(
      (res: any) => {
        this.user.loading = false;
        this.user.data = res || {};
      },
      (err: any) => {
        this.user.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  getTaskTab(data: any) {
    console.log(data);
    this.curTab = data;
    this.quillData = data.description + data.attachment[0];
    this.getcomment();
  }

  save() {
    let p = {
      description: this.quillData,
      attachment: this.quillData,
    };
    this.editTask.loading = true;
    this.userService.editTask(this.curTab._id, p).subscribe(
      (res: any) => {
        this.editTask.loading = false;
        this.toastr.success(res.data.message);
        this.ngOnInit();
      },
      (err: any) => {
        this.editTask.loading = false;
        this.toastr.error(err.error.message);
      }
    );
  }

  Cancel() {
    this.quillShow = false;
    this.quillcommentShow = false;
  }

  onInputClick() {
    this.quillShow = this.quillShow == false ? true : false;
  }

  onInputClickComment() {
    this.quillcommentShow = this.quillcommentShow == false ? true : false;
  }

  postComment() {
    let p = {
      projectId: this.task.data.projectId,
      taskId: this.curTab._id,
      attachments: this.comment.trim() || "",
      comments: this.comment.trim() || "",
    };
    this.addComment.loading = true;
    this.userService.addTaskComment(p).subscribe(
      (res: any) => {
        this.addComment.loading = false;
        this.comment = "";
        this.attachment = "";
        this.getcomment();
      },
      (err: any) => {
        this.addComment.loading = false;
        this.toastr.error(err.error.message);
      }
    );
  }

  getcomment() {
    this.viewComment.loading = true;
    this.userService.viewTaskComment(this.curTab._id).subscribe(
      (res: any) => {
        this.viewComment.loading = false;
        this.viewComment.data = res || [];
      },
      (err: any) => {
        this.viewComment.loading = false;
        this.toastr.error(err.error.message);
      }
    );
  }

  removeComment(id: any) {
    this.deleteComment.loading = true;
    this.userService.deleteTaskComment(id).subscribe(
      (res: any) => {
        this.deleteComment.loading = false;
        this.toastr.success(res.message);
        this.getcomment();
      },
      (err: any) => {
        this.deleteComment.loading = false;
        this.toastr.error(err.error.message);
      }
    );
  }

  putComment(id: any) {
    let p = {};
    this.editComment.loading = true;
    this.userService.editTaskComment(id, p).subscribe(
      (res: any) => {
        this.editComment.loading = false;
        this.getcomment();
      },
      (err: any) => {
        this.editComment.loading = false;
        this.toastr.error(err.error.message);
      }
    );
  }
}
