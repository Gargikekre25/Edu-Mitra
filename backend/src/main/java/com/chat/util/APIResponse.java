package com.chat.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
public class APIResponse {

	public APIResponse() {
		// TODO Auto-generated constructor stub
	}
	
	
	private String msg;
	private Boolean status;
	private Object data;
	public APIResponse(String msg, Boolean status, Object data) {
		super();
		this.msg = msg;
		this.status = status;
		this.data = data;
	}
	@Override
	public String toString() {
		return "APIResponse [msg=" + msg + ", status=" + status + ", data=" + data + "]";
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public Boolean getStatus() {
		return status;
	}
	public void setStatus(Boolean status) {
		this.status = status;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
	
	
	
	
	
	

}
