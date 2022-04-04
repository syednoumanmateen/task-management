import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/providers/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "src/app/providers/app.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tasks-view",
  templateUrl: "./tasks-view.component.html",
  styleUrls: ["./tasks-view.component.css"],
})
export class TasksViewComponent implements OnInit {
  urlParams: any;
  comment : any;
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
  constructor(
    private appService: AppService,
    private activatedRouete: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.appService.pageTitle = "TaskView - Task Management";
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
  }

  ngOnInit(): void {
    this.activatedRouete.queryParams.subscribe((data) => [
      (this.urlParams = data),
    ]);
    this.viewTaskList();
    this.getcomment();
  }

  viewTaskList() {
    this.task.loading = true;
    this.userService.viewTask(this.urlParams.id).subscribe(
      (res: any) => {
        this.task.loading = false;
        this.task.data = res[0] || {};
      },
      (err: any) => {
        this.task.loading = false;
      }
    );
  }

  onEdit(id: any) {
    this.router.navigate(["/taks/add-task"], {
      queryParams: {
        id: id,
      },
    });
  }

  postComment() {
    let p = {
      projectId: this.task.data.projectId,
      taskId: this.urlParams.id,
      comments: this.comment,
      attachments: "jssdjsg",
    };
    this.addComment.loading = true;
    this.userService.addTaskComment(p).subscribe(
      (res: any) => {
        this.addComment.loading = false;
      },
      (err: any) => {
        this.addComment.loading = false;
        this.toastr.error(err.error.message);
      }
    );
  }

  getcomment() {
    this.viewComment.loading = true;
    this.userService.viewTaskComment(this.urlParams.id).subscribe(
      (res: any) => {
        this.viewComment.loading = false;
        this.viewComment.data = res[0] || [];
      },
      (err: any) => {
        this.viewComment.loading = false;
        this.toastr.error(err.error.message);
      }
    );
  }

  removeComment() {
    this.deleteComment.loading = true;
    this.userService.deleteTaskComment(this.urlParams.id).subscribe(
      (res: any) => {
        this.deleteComment.loading = false;
      },
      (err: any) => {
        this.deleteComment.loading = false;
        this.toastr.error(err.error.message);
      }
    );
  }

  putComment() {
    let p = {};
    this.editComment.loading = true;
    this.userService.editTaskComment(this.urlParams, p).subscribe(
      (res: any) => {
        this.editComment.loading = false;
      },
      (err: any) => {
        this.editComment.loading = false;
        this.toastr.error(err.error.message);
      }
    );
  }
}
