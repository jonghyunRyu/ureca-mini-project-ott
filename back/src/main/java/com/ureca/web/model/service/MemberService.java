package com.ureca.web.model.service;

import java.util.UUID;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import com.ureca.web.model.UplusException;
import com.ureca.web.model.dao.MemberDao;
import com.ureca.web.model.dao.SaltDao;
import com.ureca.web.model.dto.Member;
import com.ureca.web.model.dto.SaltInfo;
import com.ureca.web.util.OpenCrypt;

@Service
public class MemberService {
	
	@Autowired
	MemberDao memberDao;
	
	@Autowired
	SaltDao saltDao;
	
	// 정규식 패턴 상수화
    private static final Pattern ID_PATTERN = Pattern.compile("^[a-z][a-z0-9_]{4,19}$");
    private static final Pattern PW_PATTERN = Pattern.compile("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$");
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
    private static final Pattern NICKNAME_PATTERN = Pattern.compile("^[가-힣a-zA-Z0-9_]{2,10}$");
    
	// 회원가입
	public void registerMember(Member m) throws UplusException {
		try {
			// 유효성 검사
			// ID 체크
	        if (m.getId() == null || !ID_PATTERN.matcher(m.getId()).matches()) {
	            throw new UplusException("아이디 형식이 올바르지 않습니다.");
	        }
	
	        // 비밀번호 체크
	        if (m.getPassword() == null || !PW_PATTERN.matcher(m.getPassword()).matches()) {
	            throw new UplusException("비밀번호 형식이 올바르지 않습니다.");
	        }
	
	        // 비밀번호 확인 체크
	        if (m.getPasswordConfirm() == null || !m.getPassword().equals(m.getPasswordConfirm())) {
	            throw new UplusException("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
	        }
	
	        // 이메일 체크
	        if (m.getEmail() == null || !EMAIL_PATTERN.matcher(m.getEmail()).matches()) {
	            throw new UplusException("이메일 형식이 올바르지 않습니다.");
	        }
	        
	        // 중복 체크 (DB 조회)
	        if (memberDao.countByEmail(m) > 0) {
	            throw new UplusException("이미 등록된 이메일입니다.");
	        }
	
	        // 닉네임 체크
	        if (m.getNickname() == null || !NICKNAME_PATTERN.matcher(m.getNickname()).matches()) {
	            throw new UplusException("닉네임 형식이 올바르지 않습니다.");
	        }
	
	        // ID 중복 체크
	        if (memberDao.countById(m) > 0) {
	            throw new UplusException("이미 사용 중인 아이디입니다.");
	        }
	        
	        // 암호화
	        // salt생성
			String salt = UUID.randomUUID().toString();
			SaltInfo saltInfo=new SaltInfo(m.getId(), salt);
			saltDao.insertSalt(saltInfo);
			
			// pw암호화
			String pwdHash=OpenCrypt.byteArrayToHex(OpenCrypt.getSHA256(m.getPassword(), salt));
			m.setPassword(pwdHash);
			
			memberDao.registerMember(m);
		} catch (Exception e) {
			e.printStackTrace();
			throw new UplusException("잠시 후 다시 시도해 주세요.");
		}
	}
	
	// 로그인
	public Member login(Member m) throws UplusException {
		try {
			// 유효성 검사
			if (m.getId() == null || !ID_PATTERN.matcher(m.getId()).matches()) {
	            throw new UplusException("아이디 형식이 올바르지 않습니다.");
	        }
	        if (m.getPassword() == null || !PW_PATTERN.matcher(m.getPassword()).matches()) {
	            throw new UplusException("비밀번호 형식이 올바르지 않습니다.");
	        }
	
	        SaltInfo saltInfo = saltDao.selectSalt(m.getId());
	        byte[] pwdHash = OpenCrypt.getSHA256(m.getPassword(), saltInfo.getSalt());
	        String pwdHashHex = OpenCrypt.byteArrayToHex(pwdHash);
	        m.setPassword(pwdHashHex);
	        
	        Member loginUser = memberDao.login(m);
	        
	        if (loginUser == null) {
	            throw new UplusException("아이디 또는 비밀번호가 일치하지 않습니다.");
	        }
			
			return loginUser;
			
		} catch (Exception e) {
			throw new UplusException("잠시 후 다시 시도해 주세요");
		}
	}
}
