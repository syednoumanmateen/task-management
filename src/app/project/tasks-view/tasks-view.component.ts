import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/providers/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "src/app/providers/app.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tasks-view",
  templateUrl: "./tasks-view.component.html",
  styleUrls: [
    "./tasks-view.component.css",
    "../../../vendor/libs/ngx-markdown-editor/ngx-markdown-editor.scss",
    "../../../vendor/libs/quill/typography.scss",
    "../../../vendor/libs/quill/editor.scss",
  ],
})
export class TasksViewComponent implements OnInit {
  urlParams: any;
  comment: any;
  attachment: any;
  quillShow: Boolean;
  quillcommentShow: Boolean;
  quillData: any;
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
    this.editTask = {
      loading: false,
    };
    this.quillShow = false;
    this.quillcommentShow = false;
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

  save() {
    let p = {
      attachment: this.quillData,
    };
    this.editTask.loading = true;
    this.userService.editTask(this.urlParams.id, p).subscribe(
      (res: any) => {
        this.editTask.loading = false;
        this.toastr.success(res.data.message);
        this.viewTaskList();
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
      taskId: this.urlParams.id,
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
    this.userService.viewTaskComment(this.urlParams.id).subscribe(
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
