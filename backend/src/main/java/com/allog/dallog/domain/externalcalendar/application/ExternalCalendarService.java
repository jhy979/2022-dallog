package com.allog.dallog.domain.externalcalendar.application;

import com.allog.dallog.domain.auth.application.OAuthClient;
import com.allog.dallog.domain.auth.domain.OAuthToken;
import com.allog.dallog.domain.auth.domain.OAuthTokenRepository;
import com.allog.dallog.domain.externalcalendar.dto.ExternalCalendarsResponse;
import org.springframework.stereotype.Service;

@Service
public class ExternalCalendarService {

    private final OAuthClient oAuthClient;
    private final ExternalCalendarClient externalCalendarClient;
    private final OAuthTokenRepository oAuthTokenRepository;

    public ExternalCalendarService(final OAuthClient oAuthClient, final ExternalCalendarClient externalCalendarClient,
                                   final OAuthTokenRepository oAuthTokenRepository) {
        this.oAuthClient = oAuthClient;
        this.externalCalendarClient = externalCalendarClient;
        this.oAuthTokenRepository = oAuthTokenRepository;
    }

    public ExternalCalendarsResponse findByMemberId(final Long memberId) {
        OAuthToken oAuthToken = oAuthTokenRepository.getByMemberId(memberId);

        String oAuthAccessToken = oAuthClient.getAccessToken(oAuthToken.getRefreshToken()).getAccessToken();

        return new ExternalCalendarsResponse(externalCalendarClient.getExternalCalendars(oAuthAccessToken));
    }
}
